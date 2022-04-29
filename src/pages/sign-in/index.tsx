import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Link, Grid, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import { useStyles } from "./styles";

import { useAuth } from '../../context/auth-context';

interface SignInFormData {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Informe um e-mail válido')
        .required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
});

const dots = (text) => {
    return (
        <div className="running">{text}<span>.</span><span>.</span><span>.</span></div>
    );
}

const SignIn: React.FC = () => {
    const [customErrorMessage, setCustomErrorMessage] = useState('');
    const [isAccessing, setIsAccessing] = useState(false);

    const { signIn } = useAuth();
    const classes = useStyles();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        setIsAccessing(true);

        try {
            await signIn({
                email: data.email,
                password: data.password
            });

            setCustomErrorMessage('');
            setIsAccessing(false);

            history.push('/');
        } catch (err) {
            setIsAccessing(false);
            setCustomErrorMessage('Ocorreu um erro ao fazer login. Cheque suas credenciais.');
        }
    }, [signIn, history]);

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values: SignInFormData, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            { }
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh', width: '100%' }}
                >
                    <Box className={classes.paper} boxShadow={4}>
                        <Form className={classes.form} noValidate>

                            <div className={classes.messages}>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    className={classes.title}
                                    style={customErrorMessage === '' ? { display: 'block' } : { display: 'none' }}>Acesso</Typography>

                                <Alert
                                    variant="filled"
                                    severity="error"
                                    style={customErrorMessage !== '' ? {} : { display: 'none' }}>{customErrorMessage}</Alert>
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                helperText={touched.email ? errors.email : ""}
                                error={touched.email && Boolean(errors.email)}
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                helperText={touched.password ? errors.password : ""}
                                error={touched.password && Boolean(errors.password)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {isAccessing === true ? dots('Acessando') : 'Acessar'}
                            </Button>

                            <Grid item>
                                <Link href="#" variant="body2">
                                    Esqueceu sua senha?
                                </Link>
                            </Grid>

                        </Form>
                    </Box>
                </Grid>
            )}
        </Formik>
    );
}

export default SignIn;
