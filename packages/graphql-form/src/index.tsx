import { FormObject, FormDisplayerProps, MainRendererProps } from '@/models';
import { Renderer } from '@/renderer';
import React from 'react';

export * from '@/models';
export { Renderer };

export const FormRenderer: React.FC<MainRendererProps> = ({ formFields, onChange, widgetsOnChange, ...props }) => {
    return (
        <>
            {Object.keys(formFields).map((key) => {
                return (
                    <Renderer
                        {...props}
                        changeWidget={(props, path) => {
                            widgetsOnChange(path, props);
                        }}
                        currentPath={''}
                        formObject={formFields[key]}
                        onChange={(changedForm: FormObject) => {
                            onChange({
                                ...formFields,
                                [key]: changedForm,
                            });
                        }}
                        f={formFields[key].node}
                    />
                );
            })}
        </>
    );
};

export const FormDisplayer: React.FC<FormDisplayerProps> = ({ formFields, onChange, ...props }) => {
    return (
        <>
            {Object.keys(formFields).map((key) => {
                return (
                    <Renderer
                        {...props}
                        changeWidget={() => {
                            return;
                        }}
                        currentPath={''}
                        formObject={formFields[key]}
                        onChange={(changedForm: FormObject) => {
                            onChange({
                                ...formFields,
                                [key]: changedForm,
                            });
                        }}
                        f={formFields[key].node}
                    />
                );
            })}
        </>
    );
};
