import { PassedFormProps } from '@/models';
import { getTypeName, Options, ScalarTypes, TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';
import React from 'react';

export const Fields: React.FC<PassedFormProps> = (props) => {
    const {
        nodes,
        widgetComponents,
        f,
        widgets,
        components: { ArrayField, ObjectField },
    } = props;
    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
    const isInput = seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (f.data.type === TypeSystemDefinition.FieldDefinition) {
        return <ObjectField {...props} />;
    }
    if (f.type.fieldType.type === Options.array) {
        return <ArrayField {...props} />;
    }
    if (isInput) {
        return <ObjectField {...props} f={seekNode} />;
    }
    const widget = widgets?.[props.currentPath];
    if (widget) {
        const WidgetComponent = widgetComponents.find((wc) => wc.name === widget.widget)?.Component;
        if (!WidgetComponent) {
            return <></>;
        }
        return <WidgetComponent {...props} widgetData={widget} />;
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
