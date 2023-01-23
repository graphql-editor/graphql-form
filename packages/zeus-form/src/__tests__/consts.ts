import { FormObject } from '@/models';
import { createParserField, Options, ParserField, TypeDefinition } from 'graphql-js-tree';

// Global Arrange
export const typeNode: ParserField = createParserField({
    name: 'Type',
    args: [],
    data: { type: TypeDefinition.ObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
});

export const inputNode: ParserField = createParserField({
    name: 'Input',
    args: [],
    data: { type: TypeDefinition.InputObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
});

export const nodeWithArgs: ParserField = createParserField({
    name: 'Root',
    args: [typeNode, inputNode],
    data: { type: TypeDefinition.ObjectTypeDefinition },
    directives: [],
    interfaces: [],
    type: { fieldType: { name: 'type', type: Options.name } },
});

export const singleNode: ParserField[] = [typeNode];
export const nodes: ParserField[] = [typeNode, inputNode, nodeWithArgs];

export const fields: Record<string, FormObject> = { test: { __form__node: typeNode, __form__value: 5 } };
export const extenedFields: Record<string, FormObject> = {
    testInput: { __form__node: inputNode, __form__value: fields },
};
export const fieldsNodeWithArgs: Record<string, FormObject> = {
    testInput: { __form__node: nodeWithArgs, __form__value: fields },
};
export const fieldsNodeWithArgsWithInput: Record<string, FormObject> = {
    testInput: { __form__node: nodeWithArgs, __form__value: extenedFields },
};
