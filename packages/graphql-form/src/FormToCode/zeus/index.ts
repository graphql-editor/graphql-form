import { zeusFieldsToReductor, zeusReduceQl } from './resolvers';
import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const formToZeus = ({ fields, nodes }: { nodes: ParserField[]; fields: Record<string, FormObject> }) => {
    console.log(typeof zeusFieldsToReductor);

    const reducedQl = zeusFieldsToReductor(fields);
    const q = zeusReduceQl(reducedQl, nodes);
    return q;
};
