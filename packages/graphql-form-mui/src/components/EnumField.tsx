import { MenuItem, Select } from '@mui/material';
import { NewFieldProps } from 'graphql-form';
import { getTypeName } from 'graphql-js-tree';
import React from 'react';
export default ({ node, value, mutate, shared: { nodes } }: NewFieldProps) => {
    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
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
            placeholder={node.name}
            value={value as string | undefined}
            onChange={(e) => {
                mutate(e.target.value);
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
