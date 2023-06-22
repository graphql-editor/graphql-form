import { Stack } from '@mui/material';
import { NewFieldProps, Render, VariableValue } from 'graphql-form';
import React from 'react';

const ObjectField: React.FC<NewFieldProps> = (props) => {
    const { value, mutate, node } = props;
    const v: Record<string, VariableValue> = (value as Record<string, VariableValue>) || {};

    return (
        <Stack pl={2} spacing={2}>
            {node.args
                ?.sort((a, b) => {
                    return b.name > a.name ? -1 : 1;
                })
                .map((a) => {
                    return (
                        <Render
                            {...props}
                            key={a.name}
                            value={v[a.name]}
                            required={false}
                            mutate={(fv) => {
                                mutate({
                                    ...v,
                                    [a.name]: fv,
                                });
                            }}
                            node={a}
                        />
                    );
                })}
        </Stack>
    );
};
export default ObjectField;
