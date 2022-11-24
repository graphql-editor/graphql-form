import { IconButton, Stack, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { PassedFormProps } from 'zeus-form';
import { TypeSystemDefinition, Options, getTypeName, TypeDefinition } from 'graphql-js-tree';
import React from 'react';
const FormLabel: React.FC<PassedFormProps & { open?: boolean; setOpen: (b: boolean) => void }> = (props) => {
    const { f, open, setOpen, nodes } = props;

    const seekNode = nodes.find((n) => n.name === getTypeName(f.type.fieldType));
    const isInput = seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;

    return (
        <Stack direction={'row'} alignItems="center" spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography>
                    {props.f.name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                        return str.toUpperCase();
                    })}
                </Typography>
                {props.required && <Typography color={'red'}>*</Typography>}
                {props.children}
            </Stack>
            {(f.data.type === TypeSystemDefinition.FieldDefinition ||
                isInput ||
                f.type.fieldType.type === Options.array) && (
                <IconButton onClick={() => setOpen(!open)}>
                    {open && <ExpandLess />}
                    {!open && <ExpandMore />}
                </IconButton>
            )}
        </Stack>
    );
};
export default FormLabel;
