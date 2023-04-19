import { NewFieldProps } from 'graphql-form';
import { TextField } from '@mui/material';
import React from 'react';
export default ({ value, node, mutate }: NewFieldProps) => {
    return (
        <TextField
            value={(value as string | undefined) || ''}
            placeholder={node.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                return str.toUpperCase();
            })}
            onChange={(e) => {
                mutate(e.target.value);
            }}
        />
    );
};
