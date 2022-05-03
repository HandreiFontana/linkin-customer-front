import React, { useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, Modal, Typography, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useStyles } from './styles'

import api from '../../services/api';

interface CreateLinkFormData {
    title: string;
    description: string;
    url: string;
    isPrivate: boolean;
    category_id: string;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Título obrigatório').max(20),
    description: Yup.string().max(60),
    url: Yup.string().required('URL obrigatório'),
})

const dots = (text) => {
    return (
        <div className="running">{text}<span>.</span><span>.</span><span>.</span></div>
    );
}

const NewLinkModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [customErrorMessage, setCustomErrorMessage] = useState('');
    const [linkIsPrivate, setLinkIsPrivate] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles();

    const handleSubmit = useCallback(async (data: CreateLinkFormData) => {
        setIsCreating(true);

        try {
            await api.post(`/links/${data.category_id}`, {
                title: data.title,
                description: data.description,
                url: data.url,
                isPrivate: data.isPrivate,
            });

            setCustomErrorMessage('');
            setIsCreating(false);
            handleClose();
        } catch (err) {
            setIsCreating(false);
            setCustomErrorMessage('Erro');
        }
    }, []);

    return (
        <div>
            <Button
                className={classes.buttonNewLink}
                onClick={handleOpen}
            >
                Novo link
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box}>
                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            url: "",
                            isPrivate: false,
                            category_id: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values: CreateLinkFormData, { setSubmitting }) => {
                            setSubmitting(true);
                            handleSubmit(values);
                            setSubmitting(false);
                        }}
                    >
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
                                style={{ minHeight: '100%', width: '100%' }}
                            >
                                <Box className={classes.paper} boxShadow={4}>
                                    <Form className={classes.form} noValidate>
                                        <div className={classes.messages}>
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                className={classes.title}
                                                style={customErrorMessage === '' ? { display: 'block' } : { display: 'none' }}>Salve um link</Typography>
                                            <Alert
                                                variant="filled"
                                                severity="error"
                                                style={customErrorMessage !== '' ? {} : { display: 'none' }}>{customErrorMessage}</Alert>
                                        </div>

                                        <Grid container className={classes.inputsBox}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="title"
                                                    label="Título"
                                                    name="title"
                                                    autoComplete="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.title}
                                                    helperText={touched.title ? errors.title : ""}
                                                    error={touched.title && Boolean(errors.title)}
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.inputRight}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="description"
                                                    label="Descrição"
                                                    name="description"
                                                    autoComplete="description"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.description}
                                                    helperText={touched.description ? errors.description : ""}
                                                    error={touched.description && Boolean(errors.description)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="url"
                                                    label="URL"
                                                    id="url"
                                                    autoComplete="current-url"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.url}
                                                    helperText={touched.url ? errors.url : ""}
                                                    error={touched.url && Boolean(errors.url)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.inputRight}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="category_id"
                                                    label="Categoria"
                                                    id="category_id"
                                                    autoComplete="current-password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.category_id}
                                                    helperText={touched.category_id ? errors.category_id : ""}
                                                    error={touched.category_id && Boolean(errors.category_id)}
                                                />
                                            </Grid>

                                            <Grid item>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                >
                                                    {isCreating === true ? dots('Acessando') : 'Salvar'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Box>
                            </Grid>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    )
}

export { NewLinkModal }