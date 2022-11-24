import { PassedFormProps } from '@/models';
import { Fields } from '@/renderer/fields';
import { Options, getTypeName, TypeDefinition } from 'graphql-js-tree';
import React, { useState } from 'react';

export const Renderer: React.FC<PassedFormProps> = (props) => {
    const {
        formObject,
        f,
        nodes,
        components: { NullField, FormLabel, FormField },
    } = props;
    const { children, ...allProps } = props;
    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
    const isInput = seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;
    const [open, setOpen] = useState(props.required);
    if (f.type.fieldType.type === Options.required) {
        return (
            <Renderer
                {...props}
                f={{
                    ...f,
                    type: { ...f.type, fieldType: { ...f.type.fieldType.nest } },
                }}
                required={true}
            />
        );
    }
    return (
        <FormField {...allProps}>
            <FormLabel {...allProps} open={open} setOpen={setOpen} children={children} />
            {formObject.__form__value === null ? (
                <NullField {...allProps} />
            ) : (
                <>{(!isInput || open) && <Fields {...allProps} />}</>
            )}
        </FormField>
    );
};
