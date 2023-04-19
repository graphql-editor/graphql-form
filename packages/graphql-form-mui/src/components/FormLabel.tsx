import { Stack, Typography } from '@mui/material';
import { NewFieldProps } from 'graphql-form';
import React from 'react';
const FormLabel: React.FC<NewFieldProps> = (props) => {
    const { node } = props;
    return (
        <Stack direction={'row'} alignItems="center" spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography>
                    {node.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                        return str.toUpperCase();
                    })}
                </Typography>
                {props.required && <Typography color={'red'}>*</Typography>}
                {props.children}
            </Stack>
        </Stack>
    );
};
export default FormLabel;
