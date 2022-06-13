import { WidgetProps } from '@/models';

export function createWidget<Props>({
    name,
    Component,
    Settings,
    Description,
    requirements,
    displayName,
}: WidgetProps<Props>) {
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
