import { resolveQlValue } from '@/FormToCode/gql/resolvers';
import { Reductor } from '@/FormToCode/models';
import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const fieldsToReductor = (toggledFields: Record<string, FormObject>): Reductor =>
    Object.entries(toggledFields).reduce((a, [key, value]) => {
        const pathElements = key.split('.');
        let start = a;
        pathElements.forEach((el, index) => {
            if (index === 0 && !!value.node.type.operations?.length) {
                el = value.node.type.operations[0];
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

export const reduceQl = (o: Reductor, nodes: ParserField[], tabs = ''): string => {
    return Object.entries(o)
        .map(([k, v]) => {
            const kName =
                v.value && Object.keys(v.value).length > 0
                    ? `${k}(${resolveQlValue(v.value, nodes, tabs)}\n${tabs})`
                    : k;
            const kObject =
                Object.keys(v.node).length > 0
                    ? `${tabs}${kName}{\n${reduceQl(v.node, nodes, tabs + '\t')}${tabs}}\n`
                    : `${tabs}${kName}\n`;
            return kObject;
        })
        .join('');
};
