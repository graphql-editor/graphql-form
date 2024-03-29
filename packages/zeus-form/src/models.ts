import { ParserField } from 'graphql-js-tree';
import React from 'react';

export type FieldComponent = React.FC<PassedFormProps>;

export type FormLabelProps = React.FC<PassedFormProps & { open?: boolean; setOpen: (b: boolean) => void }>;

export type WidgetSavedData = {
    widget: string;
    [x: string]: unknown;
};

export type SavedWidgets = {
    [selector: string]: WidgetSavedData | undefined;
};

export const enum Errs {
    REQUIRED = 'REQUIRED',
    VALUE_IN_ARRAY_REQUIRED = 'VALUE_IN_ARRAY_REQUIRED',
}

export type Errors = {
    [selector: string]: string;
};

export type SavedForms = {
    [selector: string]: FormObject;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnedDictType = any;

export type WidgetVariantType = {
    name: string;
    widget: string;
    data: ReturnedDictType;
};

export type PassedFormProps<WidgetData = ReturnedDictType> = {
    f: ParserField;
    nodes: ParserField[];
    formObject: FormObject;
    onChange: (formObject: FormObject) => void;
    required?: boolean;
    widgetComponents: WidgetType[];
    currentPath: string;
    widgets?: SavedWidgets;
    widgetData?: WidgetData;
    errors?: Errors;
    children?: React.ReactNode;
    override?: { [x: string]: any };
    components: {
        ArrayField: FieldComponent;
        ObjectField: FieldComponent;
        BooleanField: FieldComponent;
        UniversalField: FieldComponent;
        NumberField: FieldComponent;
        EnumField: FieldComponent;
        FormLabel: FormLabelProps;
        FormField: FieldComponent;
    };
};
export type FormFile = {
    widgets?: SavedWidgets;
    forms?: SavedForms;
};

export type InputFormProps<InputZeusType> = Omit<
    PassedFormProps,
    'formObject' | 'onChange' | 'f' | 'currentPath' | 'nodes' | 'override' | 'widgets'
> & {
    schema: string;
    inputName: string;
    override?: Partial<InputZeusType>;
    basicErrorMessages: Record<Errs, string>;
    values: Partial<InputZeusType>;
    widgets?: {
        [P in keyof Partial<InputZeusType>]: WidgetSavedData;
    };
    onChange: (o: Partial<InputZeusType>, errors?: Record<string, string>) => void;
};
export type InputFormLibraryProps<T> = Omit<InputFormProps<T>, 'required' | 'components'>;

export type WidgetProps<Props> = {
    Component: React.FC<PassedFormProps<Props>>;
    name: string;
};

export type WidgetType = WidgetProps<ReturnedDictType>;

export type FormValueBase =
    | { __form__value: FormValue }
    | {
          [x: string]: FormValue;
      }
    | string
    | boolean
    | number
    | null
    | undefined
    | Array<FormValue>;
export type FormValue = FormValueBase | FormObject;

export type FormObject = {
    __form__value?: FormValue;
    __form__node: ParserField;
};
