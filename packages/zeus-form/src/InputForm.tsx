import { InputFormProps, FormObject, FormValue } from '@/models';
import { Renderer } from '@/renderer';
import { resolveQlValue } from '@/resolve';
import { getTypeName, Options, Parser, ParserField, TypeDefinition, ValueDefinition } from 'graphql-js-tree';
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
                const toValue = resolveQlValue({ v: changedForm, nodes });
                onChange(toValue as Partial<T>);
            }}
            f={formObject.__form__node}
        />
    );
}

function buildForm<T>(props: {
    node: ParserField;
    nodes: ParserField[];
    values?: any;
    switchInput?: boolean;
    switchFieldName?: string;
}): FormObject {
    const { node, nodes, values } = props;
    if (
        node.type.fieldType.type === Options.array ||
        (node.type.fieldType.type === Options.required && node.type.fieldType.nest.type === Options.array)
    ) {
        return {
            __form__node: node,
            __form__value: values?.[node.name]?.map((av: any) => ({
                __form__node: node,
                __form__value: av,
            })),
        };
    }
    const seekNode = nodes.find((n) => n.name === getTypeName(node.type.fieldType));
    const isFieldOfInputType =
        node.data.type === ValueDefinition.InputValueDefinition &&
        seekNode?.data.type === TypeDefinition.InputObjectTypeDefinition;

    if (isFieldOfInputType) {
        return buildForm({ ...props, node: seekNode, switchInput: true, switchFieldName: node.name });
    }
    const isInputType = node.data.type === TypeDefinition.InputObjectTypeDefinition;
    if (isInputType) {
        const valueObject = node.args.reduce<Record<string, FormValue>>((a, b) => {
            const fv = buildForm({ ...props, node: b, values: values?.[props.switchFieldName || node.name] || {} });
            a[b.name] = fv;
            return a;
        }, {});
        return {
            __form__node: props.switchInput ? { ...node, data: { type: ValueDefinition.InputValueDefinition } } : node,
            __form__value: valueObject,
        };
    }
    return {
        __form__node: node,
        __form__value: values?.[node.name],
    };
}
