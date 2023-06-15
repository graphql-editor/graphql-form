import { NewFieldProps } from '@/models';
import { getTypeName, Options, ParserField, ScalarTypes, TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';
import React from 'react';

export const Fields: React.FC<NewFieldProps> = (props) => {
    const {
        node,
        shared: {
            nodes,
            components: { ArrayField, ObjectField },
        },
    } = props;
    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    const isInput = seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (
        node.data.type === TypeSystemDefinition.FieldDefinition ||
        node.data.type === TypeDefinition.InputObjectTypeDefinition
    ) {
        return <ObjectField {...props} />;
    }
    if (node.type.fieldType.type === Options.array) {
        return <ArrayField {...props} />;
    }
    if (node.type.fieldType.type === Options.required) {
        const nodeWithoutRequired: ParserField = {
            ...node,
            type: {
                ...node.type,
                fieldType: {
                    ...node.type.fieldType.nest,
                },
            },
        };
        return <Fields {...props} required={true} node={nodeWithoutRequired} />;
    }
    if (isInput) {
        return <ObjectField {...props} node={seekNode} />;
    }
    return <ScalarField {...props} />;
};

const ScalarField: React.FC<NewFieldProps> = (props) => {
    const {
        node,
        shared: {
            nodes,
            components: { BooleanField, NumberField, EnumField, UniversalField },
        },
    } = props;
    const typeName = getTypeName(node.type.fieldType);
    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    if (
        typeName === ScalarTypes.String ||
        typeName === ScalarTypes.ID ||
        seekNode?.data.type === TypeDefinition.ScalarTypeDefinition
    ) {
        return <UniversalField {...props} />;
    }

    if (typeName === ScalarTypes.Float || typeName === ScalarTypes.Int) {
        return <NumberField {...props} />;
    }
    if (typeName === ScalarTypes.Boolean) {
        return <BooleanField {...props} />;
    }
    if (seekNode?.data.type === TypeDefinition.EnumTypeDefinition) {
        return <EnumField {...props} />;
    }
    return <></>;
};
