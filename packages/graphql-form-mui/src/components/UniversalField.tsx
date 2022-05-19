import { TextField } from '@mui/material';
import { PassedFormProps } from 'graphql-form';
import React from 'react';
export default (props: PassedFormProps) => (
    <TextField
        value={(props.formObject.value as string | undefined) || ''}
        placeholder={props.f.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
        })}
        onChange={(e) => {
            props.onChange({
                ...props.formObject,
                value: e.target.value,
            });
        }}
    />
);
