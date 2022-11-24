import { PassedFormProps } from '@/models';
import { getWidgetFromProps } from '@/outsideUse';
import { getTypeName, Options, ScalarTypes, TypeDefinition } from 'graphql-js-tree';
import React from 'react';

export const Fields: React.FC<PassedFormProps> = (props) => {
    const {
        nodes,
        f,
        components: { ArrayField, ObjectField },
    } = props;
    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
    const isInput = f.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (isInput) {
        return <ObjectField {...props} />;
    }
    const isFieldInput = seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (f.type.fieldType.type === Options.array) {
        return <ArrayField {...props} />;
    }
    if (isFieldInput) {
        return <ObjectField {...props} f={seekNode} />;
    }
    const w = getWidgetFromProps(props);
    if (w) {
        const {
            data,
            widget: { Component },
        } = w;
        return <Component {...props} widgetData={data} />;
    }
    return <ScalarField {...props} />;
};
const ScalarField: React.FC<PassedFormProps> = (props) => {
    const {
        f,
        nodes,
        children,
        components: { BooleanField, NumberField, EnumField, UniversalField },
    } = props;
    const typeName = getTypeName(f.type.fieldType);
    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
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
    return <>{children}</>;
};
