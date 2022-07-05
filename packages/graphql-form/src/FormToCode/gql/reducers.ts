import { resolveQlValue } from './resolvers';
import { Reductor, ReductorValue } from '@/FormToCode/models';
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

export const determineArgumentsQl = (v: ReductorValue, nodes: ParserField[], tabs = '') => {
    if (v.value && Object.keys(v.value).length > 0) {
        const resolvedValue = resolveQlValue(v.value, nodes, tabs);
        if (resolvedValue) {
            return `(${resolvedValue}\n${tabs})`;
        }
    }
    return '';
};

export const reduceQl = (o: Reductor, nodes: ParserField[], tabs = ''): string => {
    return Object.entries(o)
        .map(([k, v]) => {
            const kName = `${k}${determineArgumentsQl(v, nodes, tabs)}`;
            const kObject =
                Object.keys(v.reductor).length > 0
                    ? `${tabs}${kName}{\n${reduceQl(v.reductor, nodes, tabs + '\t')}${tabs}}\n`
                    : `${tabs}${kName}\n`;
            return kObject;
        })
        .join('');
};
