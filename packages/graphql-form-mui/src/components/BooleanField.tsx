import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { PassedFormProps } from 'graphql-form';
import React from 'react';
export default ({ f, formObject, onChange }: PassedFormProps) => {
    const value = formObject.value as boolean | undefined;
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        value={value}
                        onChange={() =>
                            onChange({
                                ...formObject,
                                value: value === true ? undefined : true,
                            })
                        }
                    />
                }
                label={f.name}
            />
        </FormGroup>
    );
};
