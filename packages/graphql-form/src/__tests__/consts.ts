import { FormObject } from '@/models';
import { Options, ParserField, TypeDefinition } from 'graphql-js-tree';

// Global Arrange
export const typeNode: ParserField = {
    name: 'Type',
    args: [],
    data: { type: TypeDefinition.ObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
};

export const inputNode: ParserField = {
    name: 'Input',
    args: [],
    data: { type: TypeDefinition.InputObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
};

export const nodeWithArgs: ParserField = {
    name: 'Root',
    args: [typeNode, inputNode],
    data: { type: TypeDefinition.ObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
};

export const singleNode: ParserField[] = [typeNode];
export const nodes: ParserField[] = [typeNode, inputNode, nodeWithArgs];

export const fields: Record<string, FormObject> = { test: { node: typeNode, value: 5 } };
export const extenedFields: Record<string, FormObject> = { testInput: { node: inputNode, value: fields } };
export const fieldsNodeWithArgs: Record<string, FormObject> = { testInput: { node: nodeWithArgs, value: fields } };
export const fieldsNodeWithArgsWithInput: Record<string, FormObject> = {
    testInput: { node: nodeWithArgs, value: extenedFields },
};
