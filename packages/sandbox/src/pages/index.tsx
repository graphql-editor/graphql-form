import { Layout } from '@/src/layouts';
import MuiForm from 'graphql-form-mui';
import schema from '@/src/data/schema';
import { useState } from 'react';
import { VarFormFile } from 'graphql-form';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '@mui/material';

// const url = 'https://faker.graphqleditor.com/aexol-internal/company-manager/graphql';

// const execute = async (query: string) => {
//     const computedHeaders = Object.assign(
//         {},
//         {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         // ...(schemaHeaders?.map((v) => ({ [v[0]]: v[1] })) || []),
//     );
//     const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({ query }),
//         headers: computedHeaders,
//     })
//         .then((r) => r.json())
//         .then((r) => r.data);
//     return response;
// };

const HomePage = () => {
    const [myForm, setMyForm] = useState<VarFormFile>({
        values: {},
        vars: [
            { name: 'createObject', type: 'CreateSource' },
            { name: 'myVar', type: 'String!' },
            { name: 'Clients', type: '[EditClientData!]!' },
        ],
    });
    console.log(myForm);
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <Layout pageTitle="HomePage">
                <Stack>
                    <Column>
                        <MuiForm
                            schema={schema}
                            file={myForm}
                            onChange={(e) => {
                                setMyForm(e);
                            }}
                        />
                        <ToTheLeft>
                            <Button
                                onClick={() =>
                                    setMyForm({
                                        values: {},
                                        vars: myForm.vars,
                                    })
                                }
                                variant="contained"
                            >
                                Erase
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log('Submit');
                                }}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </ToTheLeft>
                    </Column>
                    <Column>
                        <code>
                            <pre>{'elo'}</pre>
                        </code>
                    </Column>
                </Stack>
            </Layout>
        </>
    );
};

export default HomePage;
const Stack = styled.div`
    max-width: 1280px;
    width: 100%;
    margin: auto;
    display: flex;
`;
const Column = styled.div``;
const ToTheLeft = styled.div`
    display: flex;
    justify-content: flex-end;
`;
