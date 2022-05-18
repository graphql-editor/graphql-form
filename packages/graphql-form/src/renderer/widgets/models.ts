import { PassedFormProps, CastToWidgetSettingsPassedForm } from '@/models';
import React from 'react';

export function createWidget<Props>({
    name,
    Component,
    Settings,
    requirements,
}: {
    name: string;
    Component: React.FC<PassedFormProps<Props>>;
    Settings?: React.FC<CastToWidgetSettingsPassedForm<Props>>;
    requirements: (props: PassedFormProps) => boolean;
}) {
    return {
        Component,
        Settings,
        requirements,
        props: {} as Props,
        name,
    };
}
