import { FormControl } from '@mui/material';
import { NewFieldProps } from 'graphql-form';
import React from 'react';
const FormField: React.FC<NewFieldProps> = (props) => {
    const { children } = props;
    return <FormControl fullWidth>{children}</FormControl>;
};

export default FormField;
