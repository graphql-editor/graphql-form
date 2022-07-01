import { ParserField, TypeDefinition, Options } from 'graphql-js-tree';
import { FormObject } from '@/models';
import { formToZeus } from './index';

it('tranform form to zeus', () => {
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

    const result = formToZeus({ nodes, fields });
    console.log(result);
});
export {};
