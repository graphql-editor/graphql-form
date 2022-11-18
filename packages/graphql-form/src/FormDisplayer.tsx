import { formToGql } from '@/FormToCode';
import { FormDisplayerProps, FormObject } from '@/models';
import { Renderer } from '@/renderer';
import { Parser, TypeSystemDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';

export const FormDisplayer: React.FC<FormDisplayerProps> = ({ formFile, onChange, schema, ...props }) => {
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
                        nodes={nodes}
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
