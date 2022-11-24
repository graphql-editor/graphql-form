import ArrayField from '@/components/ArrayField';
import BooleanField from '@/components/BooleanField';
import EnumField from '@/components/EnumField';
import FormField from '@/components/FormField';
import FormLabel from '@/components/FormLabel';
import NullField from '@/components/NullField';
import NumberField from '@/components/NumberField';
import ObjectField from '@/components/ObjectField';
import UniversalField from '@/components/UniversalField';
import { InputForm, InputFormLibraryProps } from 'zeus-form';
import React from 'react';

function MuiInputForm<T>(props: InputFormLibraryProps<T>) {
    return (
        <InputForm
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
}

export default MuiInputForm;
