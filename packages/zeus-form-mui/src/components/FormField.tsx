import { FormControl, FormHelperText } from '@mui/material';
import { getErrorFromProps, PassedFormProps } from 'zeus-form';
import React from 'react';
const FormField: React.FC<PassedFormProps> = (props) => {
    const { children } = props;
    const errors = getErrorFromProps(props);
    return (
        <FormControl fullWidth error={!!errors}>
            {children}
            {errors && <FormHelperText>{errors}</FormHelperText>}
        </FormControl>
    );
};

export default FormField;
