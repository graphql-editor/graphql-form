import { TextField } from '@mui/material';
import { PassedFormProps } from 'zeus-form';
import React from 'react';
export default (props: PassedFormProps) => {
    return (
        <TextField
            value={(props.formObject.__form__value as string | undefined) || ''}
            placeholder={props.f.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                return str.toUpperCase();
            })}
            onChange={(e) => {
                props.onChange({
                    ...props.formObject,
                    __form__value: e.target.value,
                });
            }}
        />
    );
};
