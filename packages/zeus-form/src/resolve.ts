import { FormValue, FormValueBase } from '@/models';
import { Options, ParserField } from 'graphql-js-tree';

export const resolveQlValue = ({ v, nodes }: { v: FormValue | undefined; nodes: ParserField[] }): FormValueBase => {
    if (typeof v === 'undefined') {
        return;
    }
    if (v === null) {
        return v;
    }
    if (Array.isArray(v)) {
        if (v.length === 0) return;
        return v.map((vv) => resolveQlValue({ v: vv, nodes }));
    }
    if (typeof v === 'object') {
        if ('__form__value' in v) {
            if ('__form__node' in v) {
                const n = v.__form__node as ParserField;
                if (n.type.fieldType.type === Options.required) {
                    return resolveQlValue({
                        v: {
                            __form__node: {
                                ...n,
                                type: {
                                    ...n.type,
                                    fieldType: {
                                        ...n.type.fieldType.nest,
                                    },
                                },
                            },
                            __form__value: v.__form__value,
                        },
                        nodes,
                    });
                }
            }
            return resolveQlValue({ v: v.__form__value, nodes });
        }
        const e = Object.entries(v).reduce((a, [key, val]) => {
            const value = resolveQlValue({ v: val as FormValue, nodes });
            if (typeof value === 'undefined' || value === null) {
                return a;
            }
            if (typeof value === 'object' && Object.keys(value).length === 0) {
                return a;
            }
            a[key] = value;
            return a;
        }, {} as any);
        return e;
    }
    return v as FormValueBase;
};
