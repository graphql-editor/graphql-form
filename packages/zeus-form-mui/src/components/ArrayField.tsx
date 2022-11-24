import { Button, IconButton, Stack } from '@mui/material';
import { FormObject, FormValue, PassedFormProps, Renderer } from 'zeus-form';
import { Options, ParserField } from 'graphql-js-tree';
import React from 'react';
import { Add, ArrowDownward, ArrowUpward, Close } from '@mui/icons-material';

const ArrayField: React.FC<
    PassedFormProps & {
        open?: boolean;
    }
> = (props) => {
    const { formObject, onChange, f } = props;
    formObject.__form__value ||= [];
    if (f.type.fieldType.type !== Options.array) {
        throw new Error('Invalid Array node');
    }
    const nodeWithoutArray: ParserField = {
        ...f,
        type: {
            ...f.type,
            fieldType: {
                ...f.type.fieldType.nest,
            },
        },
    };
    const formValuePointer = formObject.__form__value as Array<FormValue>;
    return (
        <Stack>
            {formValuePointer.map((v, i: number, all) => {
                formValuePointer[i] ||= { __form__node: nodeWithoutArray };
                return (
                    <Stack key={f.name + i}>
                        <Renderer
                            key={i}
                            {...props}
                            f={{
                                ...nodeWithoutArray,
                                name: `${nodeWithoutArray.name}[${i}]`,
                            }}
                            onChange={(e) => {
                                formValuePointer[i] = e;
                                onChange({
                                    ...formObject,
                                    __form__value: formValuePointer,
                                });
                            }}
                            formObject={v as FormObject}
                        >
                            <Stack direction="row">
                                <IconButton
                                    onClick={() => {
                                        onChange({
                                            ...formObject,
                                            __form__value: formValuePointer.filter((_, index) => i !== index),
                                        });
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
                                            onChange({
                                                ...formObject,
                                                __form__value: formValuePointer,
                                            });
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
                                            onChange({
                                                ...formObject,
                                                __form__value: formValuePointer,
                                            });
                                        }}
                                    >
                                        <ArrowDownward />
                                    </IconButton>
                                )}
                            </Stack>
                        </Renderer>
                    </Stack>
                );
            })}

            <Button
                onClick={() => {
                    formValuePointer.push({});
                    onChange({
                        ...formObject,
                        __form__value: formValuePointer,
                    });
                }}
                endIcon={<Add />}
            >
                {`Add ${f.name}`}
            </Button>
        </Stack>
    );
};
export default ArrayField;
