import { formToZeus } from './index';
import {
    extenedFields,
    nodes,
    replSpace,
    singleNode,
    fields,
    fieldsNodeWithArgs,
    fieldsNodeWithArgsWithInput,
} from '../../__tests__';

it('tranform form to zeus, typeNode, No args', () => {
    // Arrange
    const expectedValue = 'api("undefined")({})';

    // Act
    const result = formToZeus({ nodes: singleNode, fields });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to zeus, typeNode, With args', () => {
    // Arrange
    const expectedValue = 'api("undefined")({})';

    // Act
    const result = formToZeus({ nodes: nodes, fields });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to zeus, inputNode, With args', () => {
    // Arrange
    const expectedValue = 'testInput:[{test:5},true]';

    // Act
    const result = formToZeus({ nodes: nodes, fields: extenedFields });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to zeus, singleTypeNode, No args', () => {
    // Arrange
    const expectedValue = 'testInput:[{test:5},true]';

    // Act
    const result = formToZeus({ nodes: singleNode, fields: extenedFields });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to zeus, singleTypeNode, fieldsNodeWithArgs', () => {
    // Arrange
    const expectedValue = 'testInput:[{test:5},true]';

    // Act
    const result = formToZeus({ nodes: singleNode, fields: fieldsNodeWithArgs });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to zeus, singleTypeNode, fieldsNodeWithArgsWithInput', () => {
    // Arrange
    const expectedValue = 'testInput:[{testInput:[objectObject]},true]';

    // Act
    const result = formToZeus({ nodes: singleNode, fields: fieldsNodeWithArgsWithInput });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

export {};
