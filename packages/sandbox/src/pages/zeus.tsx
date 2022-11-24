import { Layout } from '@/src/layouts';
import InputMuiForm from 'zeus-form-mui';
import addSource from '@/src/data/addSourceInput';
import schema from '@/src/data/schema';
import { useMemo, useState } from 'react';
import { graphqlFormUtils } from 'graphql-form';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '@mui/material';

const url = 'https://faker.graphqleditor.com/aexol-internal/company-manager/graphql';

const HomePage = () => {
    const [myForm, setMyForm] = useState(addSource);
    const [errs, setErrs] = useState<Record<string, string>>({});
    const { eraseForm, validateForm } = useMemo(() => graphqlFormUtils(schema), [schema]);
    const [values, setValues] = useState<any>({});
    console.log(values);
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
                    <InputMuiForm<any>
                        schema={schema}
                        inputName="CreateSource"
                        errors={errs}
                        onChange={(e) => {
                            setValues(e);
                        }}
                        values={values}
                        widgetComponents={[]}
                    />
                    <ToTheLeft>
                        <Button onClick={() => setMyForm(eraseForm(myForm))} variant="contained">
                            Erase
                        </Button>
                        <Button onClick={() => {}} variant="contained">
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
