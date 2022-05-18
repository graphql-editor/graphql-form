import { zeusFieldsToReductor, zeusReduceQl } from '@/FormToCode/zeus/resolvers';
import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const formToZeus = ({ fields, nodes }: { nodes: ParserField[]; fields: Record<string, FormObject> }) => {
    const reducedQl = zeusFieldsToReductor(fields);
    const q = zeusReduceQl(reducedQl, nodes);
    return q;
};
