import { WidgetProps } from '@/models';

export function createWidget<Props>(params: WidgetProps<Props>): WidgetProps<Props> & { props: Props } {
    return {
        ...params,
        props: {} as Props,
    };
}
