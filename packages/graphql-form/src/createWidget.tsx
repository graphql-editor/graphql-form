import { PassedFormProps, CastToWidgetSettingsPassedForm } from '@/models';
import React from 'react';

export function createWidget<Props>({
    name,
    Component,
    Settings,
    Description,
    requirements,
    displayName,
}: {
    name: string;
    displayName?: string;
    Component: React.FC<PassedFormProps<Props>>;
    Settings?: React.FC<CastToWidgetSettingsPassedForm<Props>>;
    Description?: React.FC;
    requirements: (props: PassedFormProps) => boolean;
}) {
    return {
        displayName,
        Component,
        Settings,
        Description,
        requirements,
        props: {} as Props,
        name,
    };
}
