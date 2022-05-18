import { FormObject, FormValue } from '@/models';
import { ParserField, getTypeName, TypeDefinition, ScalarTypes } from 'graphql-js-tree';

export const resolveSingularValue = (v: FormObject, nodes: ParserField[], tabs = ''): string => {
    if (v.value === null) {
        return 'null';
    }
    if (Array.isArray(v.value)) {
        return `[${v.value
            .map((subVal) => resolveSingularValue({ node: v.node, value: (subVal as FormObject).value }, nodes, tabs))
            .join(', ')}]`;
    }
    const seekNode = nodes.find((n) => n.name === getTypeName(v.node.type.fieldType));
    if (seekNode?.data.type === TypeDefinition.EnumTypeDefinition) {
        return v.value as string;
    }
    if (seekNode?.data.type === TypeDefinition.ScalarTypeDefinition) {
        return v.value as string;
    }
    if (seekNode) {
        return `{${resolveQlValue(v.value, nodes, tabs + '\t')}\n${tabs}\t}`;
    }
    return getTypeName(v.node.type.fieldType) === ScalarTypes.String ? `"${v.value}"` : `${v.value}`;
};

export const resolveQlValue = (v: FormValue | undefined, nodes: ParserField[], tabs = '') => {
    if (typeof v === 'undefined' || v === null) {
        return '';
    }
    return Object.entries(v).reduce((a, [key, v]: [key: string, value: FormObject]) => {
        if (typeof v.value === 'undefined' || v.value === '') {
            return a;
        }
        if (Array.isArray(v.value) && v.value.length === 0) {
            return a;
        }
        if (
            typeof v.value === 'object' &&
            v.value !== null &&
            !Object.values(v.value).some(
                (val) =>
                    typeof val === 'object' && val !== null && 'value' in val && (!!val.value || val.value === false),
            )
        ) {
            return a;
        }
        const resolvedValue = resolveSingularValue(v, nodes, tabs);
        a = `${a}\n\t${tabs}${key}: ${resolvedValue}`;
        return a;
    }, '');
};
