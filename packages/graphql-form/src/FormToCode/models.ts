import { FormValue } from '@/models';

export type ReductorValue = {
    node: Reductor;
    value?: FormValue;
};
export type Reductor = {
    [key: string]: ReductorValue;
};
