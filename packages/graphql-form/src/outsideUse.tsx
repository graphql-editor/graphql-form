import { Errs, FormFile, FormObject, FormValue, PassedFormProps } from '@/models';
import {
    getTypeName,
    Options,
    ParserField,
    ScalarTypes,
    TypeDefinition,
    TypeSystemDefinition,
    ValueDefinition,
} from 'graphql-js-tree';

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
export const getErrorFromProps = (props: PassedFormProps) => {
    return props.errors?.[props.currentPath];
};

export const validateValue = (
    f: FormValue,
    nodes: ParserField[],
    path: string,
    pushErrors: (path: string, value: Errs) => void,
) => {
    if (
        f === null ||
        typeof f === 'string' ||
        typeof f === 'boolean' ||
        typeof f === 'number' ||
        typeof f === 'undefined'
    ) {
        return;
    }
    if (
        'node' in f &&
        typeof f.node === 'object' &&
        f.node !== null &&
        'args' in f.node &&
        'data' in f.node &&
        typeof f.node.data === 'object' &&
        !!f.node.data &&
        'type' in f.node.data &&
        'directives' in f.node
    ) {
        const { node, value } = f as FormObject;
        console.log(`Validating ${node.name}`, node);
        if (node.data.type === ValueDefinition.InputValueDefinition) {
            if (
                node.type.fieldType.type === Options.required &&
                getTypeName(node.type.fieldType) !== ScalarTypes.Boolean
            ) {
                if (typeof value === 'undefined' || value === '') {
                    pushErrors(path, Errs.REQUIRED);
                }
                if (Array.isArray(value)) {
                    for (const v of value) {
                        console.log(v);
                        validateValue(v, nodes, path, pushErrors);
                    }
                }
            }
        }
    }
    if ('value' in f && !!f.value) {
        const { value } = f;
        if (Array.isArray(value)) {
            value.map((vv) => validateValue(vv, nodes, path, pushErrors));
            return;
        }
        if (typeof value === 'object' && !!value) {
            Object.entries(value).forEach(([k, v]) =>
                validateValue(v as FormObject, nodes, `${path}.${k}`, pushErrors),
            );
            return;
        }
    }
    return;
};

export const validateForm = (v: FormFile, nodes: ParserField[], errors: Record<Errs, string>) => {
    const errorDict: Record<string, string> = {};
    if (!v.forms) return errorDict;
    Object.entries(v.forms).forEach(([k, val]) => {
        validateValue(val, nodes, k, (p, err) => {
            errorDict[p] = errors[err];
        });
    });
    return errorDict;
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
