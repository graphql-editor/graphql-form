import { TextField } from '@mui/material';
import { NewFieldProps } from 'graphql-form';
import React from 'react';
export default ({ value, mutate }: NewFieldProps) => (
    <TextField
        type="number"
        value={(value as string | undefined) || ''}
        onChange={(e) => {
            mutate(e.target.value);
        }}
    />
);
