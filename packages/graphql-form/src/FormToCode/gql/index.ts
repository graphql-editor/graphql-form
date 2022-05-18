import { fieldsToReductor, reduceQl } from '@/FormToCode/gql/reducers';
import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const formToGql = ({ fields, nodes }: { nodes: ParserField[]; fields: Record<string, FormObject> }) => {
    const reducedQl = fieldsToReductor(fields);
    const q = reduceQl(reducedQl, nodes);
    return q;
};
