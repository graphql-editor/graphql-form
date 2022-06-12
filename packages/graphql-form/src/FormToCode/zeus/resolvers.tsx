import { resolveQlValue } from '@/FormToCode/gql/resolvers';
import { Reductor } from '@/FormToCode/models';
import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

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
            start[el].reductor = start[el].reductor || {};
            if (index === pathElements.length - 1) {
                if (value.value && Object.keys(value.value).length > 0) {
                    start[el].value = value.value;
                }
            }
            start = start[el].reductor;
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
                return Object.keys(v.reductor).length > 0
                    ? `${tabs}${k}:[{${resolveQlValue(v.value, nodes, tabs)}\n${tabs}}, {\n${zeusReduceQl(
                          v.reductor,
                          nodes,
                          tabs + '\t',
                          lUP,
                      )}${tabs}}]\n`
                    : `${tabs}${k}:[{${resolveQlValue(v.value, nodes, tabs)}\n${tabs}}, true]`;
            }
            if (level === 0) {
                return `const result = await api("${
                    nodes.find((n) => n.name === k)?.type.operations?.[0]
                }")({\n${zeusReduceQl(v.reductor, nodes, tabs + '\t', lUP)}})`;
            }
            const kObject =
                Object.keys(v.reductor).length > 0
                    ? `${tabs}${k}:{\n${zeusReduceQl(v.reductor, nodes, tabs + '\t', lUP)}${tabs}}\n`
                    : `${tabs}${k}: true\n`;
            return kObject;
        })
        .join('');
};
