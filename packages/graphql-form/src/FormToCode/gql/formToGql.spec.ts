import { formToGql } from './index';
import {
    extenedFields,
    fields,
    nodes,
    replSpace,
    singleNode,
    fieldsNodeWithArgs,
    fieldsNodeWithArgsWithInput,
    nodeWithArgs,
} from '../../__tests__';

it('tranform form to Gql, typeNode, No args', () => {
    // Arrange
    const expectedValue = 'test';
    // Act
    const result = formToGql({ nodes: singleNode, fields });
    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to Gql, typeNode, With args', () => {
    // Arrange
    const expectedValue = `testInput(
        test: 5
    )`;

    // Act
    const result = formToGql({ nodes, fields: extenedFields });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to Gql, typeNode, fieldsNodeWithArgs', () => {
    // Arrange
    const expectedValue = `testInput(
        test: 5
    )`;

    // Act
    const result = formToGql({ nodes, fields: fieldsNodeWithArgs });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to Gql, typeNode, fieldsNodeWithArgsWithInput', () => {
    // Arrange
    const expectedValue = 'testInput(testInput:[objectObject])';

    // Act
    const result = formToGql({ nodes, fields: fieldsNodeWithArgsWithInput });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

it('tranform form to Gql, nodeWithArgs, fieldsNodeWithArgsWithInput', () => {
    // Arrange
    const expectedValue = 'testInput(testInput:[objectObject])';

    // Act
    const result = formToGql({ nodes: [nodeWithArgs], fields: fieldsNodeWithArgsWithInput });

    // Assert
    const matchExact = replSpace(result);
    matchExact(expectedValue);
});

export {};
