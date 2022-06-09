import { Errs, FormFile, FormObject, PassedFormProps } from '@/models';
import { getTypeName, Options, ParserField, TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';

export const getWidgetFromProps = (props: PassedFormProps) => {
    const w = props.widgets?.[props.currentPath];
    const FoundBasicWidget = props.widgetComponents.find((wc) => wc.name === w?.widget);
    if (!FoundBasicWidget) {
        const widgetVariant = props.widgetVariants?.find((wv) => wv.name === w?.widget);
        if (!widgetVariant) {
            return;
        }
        const FoundVariantWidget = props.widgetComponents.find((wc) => wc.name === widgetVariant.widget);
        if (!FoundVariantWidget) {
            return;
        }
        return {
            data: {
                widget: widgetVariant.widget,
                ...widgetVariant.data,
            },
            widget: FoundVariantWidget,
        };
    }
    return {
        data: w,
        widget: FoundBasicWidget,
    };
};

export const validateValue = (
    f: FormObject,
    nodes: ParserField[],
    errors: Record<Errs, string>,
    pushErrors: (isValid: boolean) => void,
): FormObject => {
    const { value, node } = f;

    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    let errs: string[] | undefined;
    if (
        !seekNode ||
        seekNode?.data.type === TypeDefinition.EnumTypeDefinition ||
        seekNode?.data.type === TypeDefinition.ScalarTypeDefinition
    ) {
        if (node.type.fieldType.type === Options.required) {
            if (!value) {
                errs = [errors[Errs.REQUIRED]];
            }
            if (
                node.type.fieldType.nest.type === Options.array &&
                node.type.fieldType.nest.nest.type === Options.required
            ) {
                if (Array.isArray(value)) {
                    for (const v of value) {
                        if (!v) {
                            errs = [errors[Errs.VALUE_IN_ARRAY_REQUIRED]];
                        }
                    }
                }
            }
        }
    }
    pushErrors(!errs?.length);
    if ((seekNode || node.data.type === TypeSystemDefinition.FieldDefinition) && value) {
        return {
            ...f,
            value: Object.fromEntries(
                Object.entries(value).map(([k, v]) => [k, validateValue(v as FormObject, nodes, errors, pushErrors)]),
            ),
            errors: errs,
        };
    }
    return {
        ...f,
        errors: errs,
    };
};

export const validateForm = (v: FormFile, nodes: ParserField[], errors: Record<Errs, string>) => {
    let isValid = true;
    if (!v.forms) return [v, isValid] as const;
    const forms = Object.entries(v.forms)
        .map(([k, val]) => {
            return [
                k,
                validateValue(val, nodes, errors, (valid) => {
                    if (!valid) {
                        isValid = valid;
                    }
                }),
            ] as const;
        })
        .reduce(
            (a, [k, val]) => ({
                ...a,
                [k]: val,
            }),
            {} as FormFile['forms'],
        );
    return [
        {
            ...v,
            forms,
        } as FormFile,
        isValid,
    ] as const;
};

export const eraseValue = (f: FormObject, nodes: ParserField[]): FormObject => {
    const { value, node } = f;

    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    if (
        !seekNode ||
        seekNode?.data.type === TypeDefinition.EnumTypeDefinition ||
        seekNode?.data.type === TypeDefinition.ScalarTypeDefinition
    ) {
        return {
            ...f,
            value: undefined,
        };
    }
    if ((seekNode || node.data.type === TypeSystemDefinition.FieldDefinition) && value) {
        return {
            ...f,
            value: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, eraseValue(v as FormObject, nodes)])),
        };
    }
    return {
        ...f,
        value: undefined,
    };
};

export const eraseForm = (v: FormFile, nodes: ParserField[]) => {
    if (!v.forms) return v;
    const forms = Object.entries(v.forms)
        .map(([k, val]) => {
            return [k, eraseValue(val, nodes)] as const;
        })
        .reduce(
            (a, [k, val]) => ({
                ...a,
                [k]: val,
            }),
            {} as FormFile['forms'],
        );
    return {
        ...v,
        forms,
    };
};
