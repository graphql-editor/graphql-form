import { NewFieldProps } from 'graphql-form';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
export default ({ mutate, node, value }: NewFieldProps) => {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox value={!!value} onChange={() => mutate(!value)} />}
                label={node.name}
            />
        </FormGroup>
    );
};
