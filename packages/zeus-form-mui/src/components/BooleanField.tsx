import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { PassedFormProps } from 'zeus-form';
import React from 'react';
export default ({ f, formObject, onChange }: PassedFormProps) => {
    const value = formObject.__form__value as boolean | undefined;
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        value={value}
                        onChange={() =>
                            onChange({
                                ...formObject,
                                __form__value: value === true ? undefined : true,
                            })
                        }
                    />
                }
                label={f.name}
            />
        </FormGroup>
    );
};
