import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, Link, Grid, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';

import { useStyles } from "./styles";

import { useAuth } from '../../context/auth-context';
import api from '../../services/api';


interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Informe um e-mail válido')
        .required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), ''],
        'As senhas devem ser iguais'
    ),
    username: Yup.string().required('Nome de usuário é obrigatório'),
});

const dots = (text) => {
    return (
        <div className="running">{text}<span>.</span><span>.</span><span>.</span></div>
    );
}

const SignUp: React.FC = () => {
    const [customErrorMessage, setCustomErrorMessage] = useState('');
    const [isAccessing, setIsAccessing] = useState(false);

    const signUp = useCallback(async ({
        username,
        email,
        password
    }: SignUpFormData) => {
        await api.post('accounts', {
            username,
            email,
            password
        });
    }, []);

    const { signIn } = useAuth();
    const classes = useStyles();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        setIsAccessing(true);

        try {
            await signUp({
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            })

            await signIn({
                email: data.email,
                password: data.password
            });

            setCustomErrorMessage('');
            setIsAccessing(false);

            history.push('/');
        } catch (err) {
            setIsAccessing(false);
            setCustomErrorMessage('Erro');
        }
    }, [signUp, history]);

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: SignUpFormData, { setSubmitting, resetForm }) => {
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
                    justify="center"
                    style={{ minHeight: '100vh', width: '100%' }}
                >
                    <Box className={classes.paper} boxShadow={4}>
                        <Form className={classes.form} noValidate>

                            <div className={classes.messages}>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    className={classes.title}
                                    style={customErrorMessage === '' ? { display: 'block' } : { display: 'none' }}>Registre-se</Typography>

                                <Alert
                                    variant="filled"
                                    severity="error"
                                    style={customErrorMessage !== '' ? {} : { display: 'none' }}>{customErrorMessage}</Alert>
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                helperText={touched.username ? errors.username : ""}
                                error={touched.username && Boolean(errors.username)}
                                autoFocus
                            />

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

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar senha"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
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

export default SignUp;
