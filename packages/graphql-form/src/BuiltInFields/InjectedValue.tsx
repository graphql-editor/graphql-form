import { PassedFormProps } from '@/models';
import React, { useEffect } from 'react';

export const InjectedValue: React.FC<PassedFormProps<{ value: any }>> = (props) => {
    const { value } = props.widgetData || {};
    useEffect(() => {
        if (value === props.formObject.value) return;
        props.onChange({
            ...props.formObject,
            value,
        });
    }, [value]);
    return <></>;
};
