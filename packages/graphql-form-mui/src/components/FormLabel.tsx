import { PassedFormProps } from 'graphql-form';
import React from 'react';
const FormLabel: React.FC<PassedFormProps> = (props) => (
    <div>
        {props.f.name} {props.children}
    </div>
);

export default FormLabel;
