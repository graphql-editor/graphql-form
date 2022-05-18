import { Layout } from '@/src/layouts';
import MuiForm from 'graphql-form-mui';
import { Parser } from 'graphql-js-tree';
import addSource from '@/src/data/addSource';
import schema from '@/src/data/schema';
import { useState } from 'react';

const parsedSchema = Parser.parse(schema);

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
                widgetComponents={[]}
            />
        </Layout>
    );
};

export default HomePage;
