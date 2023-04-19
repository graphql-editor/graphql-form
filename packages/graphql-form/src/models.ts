import { ParserField } from 'graphql-js-tree';
import { VariableDefinitionWithoutLoc } from 'graphql-js-tree/lib/Models/GqlParserTree';
import React from 'react';

export const enum Errs {
    REQUIRED = 'REQUIRED',
    VALUE_IN_ARRAY_REQUIRED = 'VALUE_IN_ARRAY_REQUIRED',
}

export type Errors = {
    [selector: string]: string;
};

// New implementation

export type VariableValue =
    | {
          [x: string]: VariableValue;
      }
    | string
    | boolean
    | number
    | null
    | undefined
    | Array<VariableValue>;

export type VarValues = {
    [variableName: string]: VariableValue;
};
export type VarFormFile = {
    values: VarValues;
    vars: VariableDefinitionWithoutLoc[];
};

export type VarFormProps = {
    file: VarFormFile;
    onChange: (file: VarFormFile) => void;
    schema: string;
    shared: Omit<SharedProps, 'nodes'>;
};

type SharedProps = {
    nodes: ParserField[];
    components: {
        ArrayField: NewFieldComponent;
        ObjectField: NewFieldComponent;
        BooleanField: NewFieldComponent;
        UniversalField: NewFieldComponent;
        NumberField: NewFieldComponent;
        EnumField: NewFieldComponent;
        NullField: NewFieldComponent;
        FormLabel: NewFormLabelProps;
        FormField: NewFieldComponent;
    };
};

export type NewFieldProps = {
    node: ParserField;
    value: VariableValue;
    shared: SharedProps;
    mutate: (value: VariableValue) => void;
    children?: React.ReactNode;
    required?: boolean;
};
export type NewFieldComponent = React.FC<NewFieldProps>;

export type NewFormLabelProps = React.FC<NewFieldProps>;
