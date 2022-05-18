import { TextField } from '@mui/material';
import { PassedFormProps } from 'graphql-form';
import React from 'react';
export default (props: PassedFormProps) => (
    <TextField
        type="number"
        value={(props.formObject.value as string | undefined) || ''}
        onChange={(e) => {
            props.onChange({
                ...props.formObject,
                value: e.target.value,
            });
        }}
    />
);
