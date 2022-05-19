import { FormControl } from '@mui/material';
import { PassedFormProps } from 'graphql-form';
import React from 'react';
const FormField: React.FC<PassedFormProps> = ({ children }) => <FormControl fullWidth>{children}</FormControl>;

export default FormField;
