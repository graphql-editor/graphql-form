import { Button, IconButton, Stack } from '@mui/material';
import { NewFieldProps, VariableValue, Render } from 'graphql-form';
import { Options, ParserField } from 'graphql-js-tree';
import React from 'react';
import { Add, ArrowDownward, ArrowUpward, Close } from '@mui/icons-material';

const ArrayField: React.FC<NewFieldProps> = (props) => {
    const { mutate, node, shared, value } = props;
    const v: Array<VariableValue> = (value as Array<VariableValue>) || [];
    if (node.type.fieldType.type !== Options.array) {
        throw new Error(`Invalid node ${node.name}`);
    }
    const nodeWithoutArray: ParserField = {
        ...node,
        type: {
            ...node.type,
            fieldType: {
                ...node.type.fieldType.nest,
            },
        },
    };
    const formValuePointer = v as Array<VariableValue>;
    return (
        <Stack>
            {formValuePointer.map((v, i: number, all) => {
                return (
                    <Stack key={node.name + i}>
                        <Render
                            key={i}
                            node={{
                                ...nodeWithoutArray,
                                name: `${nodeWithoutArray.name}[${i}]`,
                            }}
                            mutate={(e) => {
                                formValuePointer[i] = e;
                                mutate(formValuePointer);
                            }}
                            value={v}
                            shared={shared}
                        >
                            <Stack direction="row">
                                <IconButton
                                    onClick={() => {
                                        mutate(formValuePointer.filter((_, index) => i !== index));
                                    }}
                                >
                                    <Close />
                                </IconButton>
                                {i !== 0 && (
                                    <IconButton
                                        onClick={() => {
                                            const switched = v;
                                            formValuePointer[i] = formValuePointer[i - 1];
                                            formValuePointer[i - 1] = switched;
                                            mutate(formValuePointer);
                                        }}
                                    >
                                        <ArrowUpward />
                                    </IconButton>
                                )}
                                {i !== all.length - 1 && (
                                    <IconButton
                                        onClick={() => {
                                            const switched = v;
                                            formValuePointer[i] = formValuePointer[i + 1];
                                            formValuePointer[i + 1] = switched;
                                            mutate(formValuePointer);
                                        }}
                                    >
                                        <ArrowDownward />
                                    </IconButton>
                                )}
                            </Stack>
                        </Render>
                    </Stack>
                );
            })}

            <Button
                onClick={() => {
                    formValuePointer.push(null);
                    mutate(formValuePointer);
                }}
                endIcon={<Add />}
            >
                {`Add ${node.name}`}
            </Button>
        </Stack>
    );
};
export default ArrayField;
