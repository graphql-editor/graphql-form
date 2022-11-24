import { InputFormProps, FormObject, FormValue } from '@/models';
import { Renderer } from '@/renderer';
import { resolveQlValue } from '@/resolve';
import { getTypeName, Parser, ParserField, TypeDefinition, ValueDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';

export function InputForm<T>({ onChange, schema, values, inputName, ...props }: InputFormProps<T>) {
    const nodes = useMemo(() => {
        return Parser.parse(schema).nodes;
    }, [schema]);

    const formObject = useMemo(() => {
        const node = nodes.find(
            (n) => n.name === inputName && n.data.type === TypeDefinition.InputObjectTypeDefinition,
        );
        if (!node) throw new Error(`Invalid node: "${inputName}". Your schema does not have such input node.`);
        const v = {
            [inputName]: values,
        };
        return buildForm<typeof v>({
            node,
            nodes,
            values: v,
        });
    }, [inputName, values]);

    return (
        <Renderer
            {...props}
            nodes={nodes}
            formObject={formObject}
            key={inputName}
            currentPath={inputName}
            onChange={(changedForm: FormObject) => {
                console.log(changedForm);
                const toValue = resolveQlValue(changedForm, nodes);
                console.log(toValue);
                onChange(toValue as Partial<T>);
            }}
            f={formObject.__form__node}
        />
    );
}

function buildForm<T>(props: { node: ParserField; nodes: ParserField[]; values?: any }): FormObject {
    const { node, nodes, values } = props;
    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    const isFieldOfInputType =
        node.data.type === ValueDefinition.InputValueDefinition &&
        seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;

    if (isFieldOfInputType) {
        return {
            __form__node: node,
            __form__value: seekNode.args.reduce<Record<string, FormObject>>((a, b) => {
                a[b.name] = {
                    __form__node: b,
                    __form__value: buildForm({ ...props, node: b, values: values?.[node.name] || {} }),
                };
                return a;
            }, {}),
        };
    }
    const isInputType = node.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (isInputType) {
        return {
            __form__node: node,
            __form__value: node.args.reduce<Record<string, FormValue>>((a, b) => {
                a[b.name] = buildForm({ ...props, node: b, values: values?.[node.name] || {} });
                return a;
            }, {}),
        };
    }
    //TODO: Handle arrays
    // const scalarName = getTypeName(node.type.fieldType);
    // console.log(scalarName);
    return {
        __form__node: node,
        __form__value: values?.[node.name],
    };
}
