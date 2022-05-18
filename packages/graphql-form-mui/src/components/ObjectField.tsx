import { Stack } from '@mui/material';
import { PassedFormProps, FormObject, Renderer } from 'graphql-form';
import React from 'react';

const ObjectField: React.FC<PassedFormProps> = (props) => {
    const { formObject, f } = props;
    formObject.value ||= {};
    const fV = formObject.value as { [x: string]: FormObject };
    return (
        <Stack pl={4}>
            {f.args
                ?.sort((a, b) => {
                    return b.name > a.name ? -1 : 1;
                })
                .map((a) => {
                    fV[a.name] ||= { node: a };
                    return (
                        <Renderer
                            {...props}
                            currentPath={`${props.currentPath}.${a.name}`}
                            key={a.name}
                            formObject={fV[a.name]}
                            required={false}
                            onChange={(fv) => {
                                props.onChange({
                                    ...formObject,
                                    value: {
                                        ...fV,
                                        [a.name]: fv,
                                    },
                                });
                            }}
                            f={a}
                            children={undefined}
                        />
                    );
                })}
        </Stack>
    );
};
export default ObjectField;
