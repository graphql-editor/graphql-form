import { Options, ParserField, TypeDefinition } from 'graphql-js-tree';
import { formToGql } from './index';
import { FormObject } from '@/models';

it('tranform form to Gql', () => {
    const node: ParserField = {
        name: 'Node',
        args: [],
        data: { type: TypeDefinition.ObjectTypeDefinition },
        directives: [],
        interfaces: [],
        type: { fieldType: { name: 'type', type: Options.name } },
    };
    const nodes: ParserField[] = [node];
    const fields: Record<string, FormObject> = { test: { node, value: 2 } };

    const result = formToGql({ nodes, fields });
    console.log(result);
});
export {};
