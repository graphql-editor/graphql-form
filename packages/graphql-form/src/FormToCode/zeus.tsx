import { FormObject, FormValue } from '@/models';
import { ParserField, TypeDefinition, ScalarTypes, getTypeName } from 'graphql-js-tree';

export const zeusFieldsToReductor = (toggledFields: Record<string, FormObject>): Reductor => {
    const r = Object.entries(toggledFields).reduce((a, [key, value]) => {
        const pathElements = key.split('.');
        let start = a;
        pathElements.forEach((el, index) => {
            if (index === 0 && !!value.node.type.operations?.length) {
                el = value.node.type.operations[0];
                return;
            }
            start[el] = start[el] || {};
            start[el].node = start[el].node || {};
            if (index === pathElements.length - 1) {
                if (value.value && Object.keys(value.value).length > 0) {
                    start[el].value = value.value;
                }
            }
            start = start[el].node;
        });
        return a;
    }, {} as Reductor);
    return r;
};

export const zeusReduceQl = (o: Reductor, nodes: ParserField[], tabs = '', level = 0): string => {
    const lUP = level + 1;
    return Object.entries(o)
        .map(([k, v]) => {
            if (v.value && Object.keys(v.value).length > 0) {
                return Object.keys(v.node).length > 0
                    ? `${tabs}${k}:[{${resolveQlValue(v.value, nodes, tabs)}\n${tabs}}, {\n${zeusReduceQl(
                          v.node,
                          nodes,
                          tabs + '\t',
                          lUP,
                      )}${tabs}}]\n`
                    : `${tabs}${k}:[{${resolveQlValue(v.value, nodes, tabs)}\n${tabs}}, true]`;
            }
            if (level === 0) {
                return `const result = await api("${
                    nodes.find((n) => n.name === k)?.type.operations?.[0]
                }")({\n${zeusReduceQl(v.node, nodes, tabs + '\t', lUP)}})`;
            }
            const kObject =
                Object.keys(v.node).length > 0
                    ? `${tabs}${k}:{\n${zeusReduceQl(v.node, nodes, tabs + '\t', lUP)}${tabs}}\n`
                    : `${tabs}${k}: true\n`;
            return kObject;
        })
        .join('');
};

const resolveSingularValue = (v: FormObject, nodes: ParserField[], tabs = ''): string => {
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

const resolveQlValue = (v: FormValue | undefined, nodes: ParserField[], tabs = '') => {
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

type ReductorValue = {
    node: Reductor;
    value?: FormValue;
};
type Reductor = {
    [key: string]: ReductorValue;
};
