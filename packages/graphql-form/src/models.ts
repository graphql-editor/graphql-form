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
    changeWidget: (widgetData: WidgetSavedData | undefined, path: string) => void;
    required?: boolean;
    runQuery: (q: string) => Promise<ReturnedDictType>;
    widgetComponents: WidgetType[];
    widgetVariants?: WidgetVariantType[];
    currentPath: string;
    widgets?: SavedWidgets;
    widgetData?: WidgetData;
    errors?: Errors;
    components: {
        ArrayField: FieldComponent;
        ObjectField: FieldComponent;
        BooleanField: FieldComponent;
        UniversalField: FieldComponent;
        NumberField: FieldComponent;
        EnumField: FieldComponent;
        NullField: FieldComponent;
        FormLabel: FormLabelProps;
        FormField: FieldComponent;
    };
};
export type FormFile = {
    widgets?: SavedWidgets;
    forms?: SavedForms;
};

export type FormBuilderProps = Omit<
    PassedFormProps,
    'formObject' | 'onChange' | 'f' | 'currentPath' | 'changeWidget' | 'widgets'
> & {
    formFile: FormFile;
    onChange: (o: FormFile, query: string) => void;
};

export type FormDisplayerProps = Omit<
    PassedFormProps,
    'formObject' | 'onChange' | 'f' | 'currentPath' | 'changeWidget' | 'widgets'
> & {
    formFile: FormFile;
    onChange: (o: FormFile, query: string) => void;
};

export type FormLibraryProps = Omit<FormDisplayerProps, 'required' | 'components'>;

export type CastToWidgetSettingsPassedForm<WidgetData = ReturnedDictType> = Partial<
    PassedFormProps<Partial<WidgetData>>
> & {
    widgetSettingsChange: (data: WidgetData) => void;
};

export type WidgetType = {
    Component: React.FC<PassedFormProps>;
    Settings: React.FC<CastToWidgetSettingsPassedForm> | undefined;
    Description?: React.FC;
    requirements: (props: PassedFormProps) => boolean;
    displayName?: string;
    name: string;
};

export type FormValue =
    | { value: FormValue }
    | {
          [x: string]: FormValue;
      }
    | string
    | boolean
    | number
    | null
    | undefined
    | FormObject
    | Array<FormValue>;

export type FormObject = {
    value?: FormValue;
    node: ParserField;
};
