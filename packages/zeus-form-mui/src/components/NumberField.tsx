import { TextField } from '@mui/material';
import { PassedFormProps } from 'zeus-form';
import React from 'react';
export default (props: PassedFormProps) => (
    <TextField
        type="number"
        value={(props.formObject.__form__value as string | undefined) || ''}
        onChange={(e) => {
            props.onChange({
                ...props.formObject,
                __form__value: e.target.value,
            });
        }}
    />
);
