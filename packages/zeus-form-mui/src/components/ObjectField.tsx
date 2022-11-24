import { Stack } from '@mui/material';
import { PassedFormProps, FormObject, Renderer } from 'zeus-form';
import React from 'react';

const ObjectField: React.FC<PassedFormProps> = (props) => {
    const { formObject, f } = props;
    formObject.__form__value ||= {};
    const fV = formObject.__form__value as { [x: string]: FormObject };
    return (
        <Stack pl={2} spacing={2}>
            {f.args
                ?.sort((a, b) => {
                    return b.name > a.name ? -1 : 1;
                })
                .map((a) => {
                    fV[a.name] ||= { __form__node: a };
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
                                    __form__value: {
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
