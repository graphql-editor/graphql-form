import { FormBuilderProps, FormObject } from '@/models';
import { Renderer } from '@/renderer';
import { TypeSystemDefinition } from 'graphql-js-tree';
import React from 'react';

export const FormBuilder: React.FC<FormBuilderProps> = ({ formFile, onChange, ...props }) => {
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
                        changeWidget={(widgetData, path) => {
                            onChange({
                                ...formFile,
                                widgets: {
                                    ...widgets,
                                    [path]: widgetData,
                                },
                            });
                        }}
                        widgets={widgets}
                        currentPath={key}
                        formObject={formFields[key]}
                        onChange={(changedForm: FormObject) => {
                            onChange({
                                ...formFile,
                                forms: {
                                    ...forms,
                                    [key]: changedForm,
                                },
                            });
                        }}
                        f={formFields[key].node}
                    />
                );
            })}
        </>
    );
};
