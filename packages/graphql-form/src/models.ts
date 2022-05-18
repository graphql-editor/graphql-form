import { ParserField } from 'graphql-js-tree';
import React from 'react';

export type FieldComponent = React.FC<PassedFormProps>;

export type FormLabelProps = React.FC<PassedFormProps & { open?: boolean; setOpen: (b: boolean) => void }>;

export type WidgetSavedData = {
    widget: string;
    [x: string]: any;
};

export type SavedWidgets = {
    [selector: string]: WidgetSavedData | undefined;
};
export type SavedForms = {
    [selector: string]: FormObject;
};

export type PassedFormProps<WidgetData = any> = {
    f: ParserField;
    nodes: ParserField[];
    formObject: FormObject;
    onChange: (formObject: FormObject) => void;
    changeWidget: (widgetData: WidgetSavedData | undefined, path: string) => void;
    required?: boolean;
    runQuery: (q: string) => Promise<any>;
    widgetComponents: WidgetType[];
    currentPath: string;
    widgets?: SavedWidgets;
    widgetData?: WidgetData;
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
    onChange: (o: FormFile) => void;
};

export type FormDisplayerProps = Omit<
    PassedFormProps,
    'formObject' | 'onChange' | 'f' | 'currentPath' | 'changeWidget' | 'widgets'
> & {
    formFile: FormFile;
    onChange: (o: FormFile) => void;
};

export type FormLibraryProps = Omit<FormDisplayerProps, 'required' | 'components'>;

export type CastToWidgetSettingsPassedForm<WidgetData> = PassedFormProps<Partial<WidgetData>> & {
    close: () => void;
};

export type WidgetType = {
    Component: React.FC<PassedFormProps>;
    Settings: React.FC<CastToWidgetSettingsPassedForm<any>> | undefined;
    requirements: (props: PassedFormProps) => boolean;
    props?: Record<string, any>;
    name: string;
};

export type FormValue =
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
