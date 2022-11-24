import { FormValue, FormValueBase } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const resolveQlValue = (v: FormValue | undefined, nodes: ParserField[]): FormValueBase => {
    if (typeof v === 'undefined') {
        return;
    }
    if (v === null) {
        return v;
    }
    if (typeof v === 'object' && '__form__value' in v && Object.keys(v).length === 2) {
        return resolveQlValue(v.__form__value, nodes);
    }
    if (typeof v === 'string') {
        return v;
    }
    if (typeof v === 'number') {
        return v;
    }
    if (typeof v === 'boolean') {
        return v;
    }
    if (Array.isArray(v)) {
        if (v.length === 0) return;
        return v.map((vv) => resolveQlValue(vv, nodes)) as Array<FormValueBase>;
    }
    if (typeof v === 'object') {
        if ('__form__value' in v) {
            return resolveQlValue(v.__form__value, nodes);
        }
        const e = Object.entries(v).reduce((a, [key, val]) => {
            a[key] = resolveQlValue(val as FormValue, nodes);
            return a;
        }, {} as any);
        return e;
    }
    return v as FormValueBase;
};
