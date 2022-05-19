import { MenuItem, Select } from '@mui/material';
import { PassedFormProps } from 'graphql-form';
import { getTypeName } from 'graphql-js-tree';
import React from 'react';
export default ({ nodes, onChange, formObject, f }: PassedFormProps) => {
    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
    if (!seekNode) {
        throw new Error('Invalid enum field');
    }
    const options =
        seekNode.args?.map(({ name: label }) => ({
            label,
            value: label,
        })) || [];
    return (
        <Select
            placeholder={f.name}
            value={formObject.value as string | undefined}
            onChange={(e) => {
                onChange({
                    ...formObject,
                    value: e.target.value,
                });
            }}
        >
            {options.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                    {o.label}
                </MenuItem>
            ))}
        </Select>
    );
};
