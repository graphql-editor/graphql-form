import { formToZeus } from './index';
import { inputNode, nodes, replSpace, singleNode, typeNode, fields } from '../../__tests__';

it('tranform form to zeus, typeNode, No args', () => {
    const result = formToZeus({ nodes, fields });
    console.log('>?>?>/', result);
});
export {};
