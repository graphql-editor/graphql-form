import { Layout } from '@/src/layouts';
import MuiForm from 'graphql-form-mui';
import { getTypeName, Parser, ScalarTypes, TypeDefinition } from 'graphql-js-tree';
import addSource from '@/src/data/addSource';
import schema from '@/src/data/schema';
import { useState } from 'react';
import { createWidget } from 'graphql-form';

const parsedSchema = Parser.parse(schema);

const DateWidget = createWidget<any>({
    name: 'date',
    Component: () => {
        return <input type="date" />;
    },
    requirements: ({ f, nodes }) => {
        const typeName = getTypeName(f.type.fieldType);
        const seekNode = nodes.find((n) => n.name === typeName);
        return typeName === ScalarTypes.String || seekNode?.data.type === TypeDefinition.ScalarTypeDefinition;
    },
});

const HomePage = () => {
    const [myForm, setMyForm] = useState(addSource);
    return (
        <Layout pageTitle="HomePage">
            <MuiForm
                formFile={myForm as any}
                nodes={parsedSchema.nodes}
                onChange={(e) => {
                    setMyForm(e as any);
                }}
                runQuery={async (q: string) => {}}
                widgetComponents={[DateWidget]}
            />
        </Layout>
    );
};

export default HomePage;
