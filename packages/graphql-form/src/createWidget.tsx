import { WidgetType } from '@/models';

export function createWidget<Props>({ name, Component, Settings, Description, requirements, displayName }: WidgetType) {
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
