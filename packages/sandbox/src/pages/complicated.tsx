import { Layout } from '@/src/layouts';
import MuiForm from 'graphql-form-mui';
import { getTypeName, Parser, ScalarTypes, TypeDefinition } from 'graphql-js-tree';
import addContract from '@/src/data/addContract';
import schema from '@/src/data/schema';
import { useState } from 'react';
import { createWidget, validateForm, eraseForm, formToGql } from 'graphql-form';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '@mui/material';

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
const url = 'https://faker.graphqleditor.com/aexol-internal/company-manager/graphql';

const execute = async (query: string) => {
    const computedHeaders = Object.assign(
        {},
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // ...(schemaHeaders?.map((v) => ({ [v[0]]: v[1] })) || []),
    );
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: computedHeaders,
    })
        .then((r) => r.json())
        .then((r) => r.data);
    return response;
};

const HomePage = () => {
    const [myForm, setMyForm] = useState(addContract);
    const [query, setQuery] = useState(formToGql({ fields: myForm.forms!, nodes: parsedSchema.nodes }));
    const [errs, setErrs] = useState<Record<string, string>>({});
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <Layout pageTitle="HomePage">
                <CenterForm>
                    <MuiForm
                        formFile={myForm}
                        nodes={parsedSchema.nodes}
                        errors={errs}
                        onChange={(e, q) => {
                            console.log(e);
                            setMyForm(e);
                            setQuery(q);
                        }}
                        runQuery={execute}
                        widgetComponents={[DateWidget]}
                    />
                    <ToTheLeft>
                        <Button onClick={() => setMyForm(eraseForm(myForm, parsedSchema.nodes))} variant="contained">
                            Erase
                        </Button>
                        <Button
                            onClick={() => {
                                const errorDict = validateForm(myForm, parsedSchema.nodes, {
                                    REQUIRED: 'This value is required',
                                    VALUE_IN_ARRAY_REQUIRED: 'Value in array is required',
                                });
                                console.log(myForm);
                                setErrs(errorDict);
                                // if (isValid) {
                                //     execute(query);
                                // }
                            }}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </ToTheLeft>
                </CenterForm>
            </Layout>
        </>
    );
};

export default HomePage;
const CenterForm = styled.div`
    max-width: 480px;
    margin: auto;
    margin-bottom: 100px;
`;
const ToTheLeft = styled.div`
    display: flex;
    justify-content: flex-end;
`;
