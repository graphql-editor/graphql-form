import { Errs, FormObject, FormValue, PassedFormProps } from '@/models';
import { getTypeName, Options, ScalarTypes, ValueDefinition } from 'graphql-js-tree';

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

export const graphqlFormUtils = () => {
    const validateValue = (f: FormValue, path: string, pushErrors: (path: string, value: Errs) => void) => {
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
            '__form__node' in f &&
            typeof f.__form__node === 'object' &&
            f.__form__node !== null &&
            'args' in f.__form__node &&
            'data' in f.__form__node &&
            typeof f.__form__node.data === 'object' &&
            !!f.__form__node.data &&
            'type' in f.__form__node.data &&
            'directives' in f.__form__node
        ) {
            const { __form__node, __form__value } = f as FormObject;
            if (__form__node.data.type === ValueDefinition.InputValueDefinition) {
                if (
                    __form__node.type.fieldType.type === Options.required &&
                    getTypeName(__form__node.type.fieldType) !== ScalarTypes.Boolean
                ) {
                    if (typeof __form__value === 'undefined' || __form__value === '') {
                        pushErrors(path, Errs.REQUIRED);
                    }
                    if (Array.isArray(__form__value)) {
                        for (const v of __form__value) {
                            validateValue(v, path, pushErrors);
                        }
                    }
                }
            }
        }
        if ('__form__value' in f && !!f.__form__value) {
            const { __form__value } = f;
            if (Array.isArray(__form__value)) {
                __form__value.map((vv) => validateValue(vv, path, pushErrors));
                return;
            }
            if (typeof __form__value === 'object' && !!__form__value) {
                Object.entries(__form__value).forEach(([k, v]) =>
                    validateValue(v as FormObject, `${path}.${k}`, pushErrors),
                );
                return;
            }
        }
        return;
    };

    const validateForm = (v: FormObject, errors: Record<Errs, string>) => {
        const errorDict: Record<string, string> = {};
        Object.entries(v.__form__value as Record<string, FormObject>).forEach(([k, val]) => {
            validateValue(val, k, (p, err) => {
                errorDict[p] = errors[err];
            });
        });
        return errorDict;
    };

    return {
        validateForm,
        validateValue,
    };
};
