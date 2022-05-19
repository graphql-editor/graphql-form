import { formToGql } from '@/FormToCode';
import { FormDisplayerProps, FormObject } from '@/models';
import { Renderer } from '@/renderer';
import { TypeSystemDefinition } from 'graphql-js-tree';
import React from 'react';

export const FormDisplayer: React.FC<FormDisplayerProps> = ({ formFile, onChange, ...props }) => {
    const { widgets = {}, forms = {} } = formFile;
    const formFields = Object.fromEntries(
        Object.entries(forms).filter(
            ([, v]) => !!v.node.args?.length && v.node.data.type === TypeSystemDefinition.FieldDefinition,
        ),
    );
    return (
        <>
            {Object.keys(formFields).map((key) => {
                return (
                    <Renderer
                        {...props}
                        key={key}
                        widgets={widgets}
                        changeWidget={() => {
                            return;
                        }}
                        currentPath={key}
                        formObject={formFields[key]}
                        onChange={(changedForm: FormObject) => {
                            const updatedFile = {
                                ...formFile,
                                forms: {
                                    ...forms,
                                    [key]: changedForm,
                                },
                            };
                            const query = formToGql({ fields: updatedFile.forms, nodes: props.nodes });
                            onChange(updatedFile, query);
                        }}
                        f={formFields[key].node}
                    />
                );
            })}
        </>
    );
};
