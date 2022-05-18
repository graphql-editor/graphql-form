# GraphQL Form

Set of Graphql forms that allow to build react forms from files exported from [GraphQL Editor](https://graphqleditor.com)

## Usage

Go to [GraphQL Editor](https://graphqleditor.com) and create a form in the form builder there.

### With defined UI lib

This example refers to `graphql-form-mui` but is also valid for other libraries

### Defining your own form library

You need to provide components of type `React.FC<PassedFormProps>` for every type of field to create your own form displayer. Then just provide `.ts` file with form definition to render the form

```tsx
import ArrayField from '@/components/ArrayField';
import BooleanField from '@/components/BooleanField';
import EnumField from '@/components/EnumField';
import FormField from '@/components/FormField';
import FormLabel from '@/components/FormLabel';
import NullField from '@/components/NullField';
import NumberField from '@/components/NumberField';
import ObjectField from '@/components/ObjectField';
import UniversalField from '@/components/UniversalField';
import { FormDisplayer, FormLibraryProps } from 'graphql-form';
import React from 'react';

const MuiForm: React.FC<FormLibraryProps> = (props) => {
    return (
        <FormDisplayer
            {...props}
            components={{
                ArrayField: ArrayField,
                BooleanField: BooleanField,
                EnumField: EnumField,
                FormField: FormField,
                FormLabel: FormLabel,
                NullField: NullField,
                NumberField: NumberField,
                ObjectField: ObjectField,
                UniversalField: UniversalField,
            }}
        />
    );
};

export default MuiForm;
```

### Defining custom widgets
