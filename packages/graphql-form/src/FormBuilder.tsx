import { formToGql } from '@/FormToCode';
import { FormBuilderProps, FormObject } from '@/models';
import { Renderer } from '@/renderer';
import { Parser, TypeSystemDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';

export const FormBuilder: React.FC<FormBuilderProps> = ({ formFile, onChange, schema, ...props }) => {
    const { widgets = {}, forms = {} } = formFile;
    const formFields = Object.fromEntries(
        Object.entries(forms).filter(
            ([, v]) => !!v.node.args?.length && v.node.data.type === TypeSystemDefinition.FieldDefinition,
        ),
    );
    const nodes = useMemo(() => {
        return Parser.parse(schema).nodes;
    }, [schema]);
    return (
        <>
            {Object.keys(formFields).map((key) => {
                return (
                    <Renderer
                        {...props}
                        key={key}
                        nodes={nodes}
                        changeWidget={(widgetData, path) => {
                            const query = formToGql({ fields: forms, nodes });
                            onChange(
                                {
                                    ...formFile,
                                    widgets: {
                                        ...widgets,
                                        [path]: widgetData,
                                    },
                                },
                                query,
                            );
                        }}
                        widgets={widgets}
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
                            const query = formToGql({ fields: updatedFile.forms, nodes });
                            onChange(updatedFile, query);
                        }}
                        f={formFields[key].node}
                    />
                );
            })}
        </>
    );
};
