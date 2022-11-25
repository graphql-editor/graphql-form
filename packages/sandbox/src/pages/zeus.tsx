import { Layout } from '@/src/layouts';
import InputMuiForm from 'zeus-form-mui';
import addSource from '@/src/data/addSourceInput';
import schema from '@/src/data/schema';
import { useMemo, useState } from 'react';
import { graphqlFormUtils } from 'graphql-form';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Button } from '@mui/material';
import { ModelTypes } from '@/src/data/zeustypes';

const HomePage = () => {
    const [myForm, setMyForm] = useState(addSource);
    const [errs, setErrs] = useState<Record<string, string>>();
    const { eraseForm, validateForm } = useMemo(() => graphqlFormUtils(schema), [schema]);
    const [values, setValues] = useState<any>({});
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
                    <InputMuiForm<ModelTypes['CreateSource']>
                        schema={schema}
                        override={{ parentSource: '123' }}
                        basicErrorMessages={{
                            REQUIRED: 'This field is required',
                            VALUE_IN_ARRAY_REQUIRED: 'Array in value is required',
                        }}
                        inputName="CreateSource"
                        errors={errs}
                        onChange={(e, errors) => {
                            setValues(e);
                            setErrs(errors);
                        }}
                        values={values}
                        widgetComponents={[]}
                    />
                    <ToTheLeft>
                        <Button onClick={() => setMyForm(eraseForm(myForm))} variant="contained">
                            Erase
                        </Button>
                        <Button
                            onClick={() => {
                                console.log(values, errs);
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
