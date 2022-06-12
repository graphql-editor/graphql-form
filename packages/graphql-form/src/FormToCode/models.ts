import { FormValue } from '@/models';

export type ReductorValue = {
    reductor: Reductor;
    value?: FormValue;
};
export type Reductor = {
    [key: string]: ReductorValue;
};
