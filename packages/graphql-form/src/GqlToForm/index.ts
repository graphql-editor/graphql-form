import { FormObject } from '@/models';
import { ParserField } from 'graphql-js-tree';

export const GqlToForm = (
    Gql: string,
    schema: string,
): { nodes: ParserField[]; fields: Record<string, FormObject> } => {
    return {
        nodes: [],
        fields: { a: {} as FormObject },
    };
};
