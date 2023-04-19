import { NewFieldProps, VarFormProps } from '@/models';
import { Fields } from '@/render/fields';
import { Parser, ScalarTypes, generateNodeId, decompileType } from 'graphql-js-tree';
import React from 'react';

export const Render: React.FC<NewFieldProps> = (props) => {
    const {
        shared: {
            components: { FormLabel, FormField },
        },
    } = props;
    return (
        <FormField {...props}>
            <FormLabel {...props} />
            <Fields {...props} />
        </FormField>
    );
};

export const VariableForm: React.FC<VarFormProps> = (props) => {
    const {
        file: { values, vars },
        onChange,
        schema,
        shared,
    } = props;
    const { nodes } = Parser.parseAddExtensions(schema);
    return (
        <>
            {vars.map((v) => {
                const value = values[v.name];
                const node = nodes.find((n) => n.name === v.type) || {
                    name: v.name,
                    args: [],
                    data: {
                        type: v.type as ScalarTypes,
                    },
                    directives: [],
                    id: generateNodeId(v.name, v.type as ScalarTypes, []),
                    interfaces: [],
                    type: {
                        fieldType: decompileType(v.type),
                    },
                };
                return (
                    <Render
                        node={node}
                        shared={{
                            ...shared,
                            nodes,
                        }}
                        mutate={(val) =>
                            onChange({
                                values: { ...values, [v.name]: val },
                                vars,
                            })
                        }
                        value={value}
                        key={v.name}
                    />
                );
            })}
        </>
    );
};
