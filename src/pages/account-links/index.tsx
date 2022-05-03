import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { BsFillTrashFill } from 'react-icons/bs'

import { useAuth } from '../../context/auth-context';
import api from '../../services/api';

import { useStyles } from './styles';

interface RouteParams {
    id: string;
}

interface Category {
    id: string;
    name: string;
}

interface Link {
    id: string;
    title: string;
    description: string;
    url: string;
    isPrivate: boolean;
    category_id: string;
}

const AccountLinks: React.FC = () => {
    const classes = useStyles();
    const { account } = useAuth();

    const [categories, setCategories] = useState([]);
    const [links, setLinks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    const params = useParams<RouteParams>()

    useEffect(() => {
        async function loadCategories() {
            const { id } = params

            try {
                const categoriesValues: Category[] = []
                const linksValues: Link[] = []

                const responseCategories = await api.get(`/categories/${id}`);

                responseCategories.data.map(async (category: Category) => {
                    categoriesValues.push(category)
                })

                setCategories(categoriesValues as []) // "as []" remove error

                const responseLinks = await api.get(`/links/${id}`);

                responseLinks.data.map(async (link: Link) => {
                    linksValues.push(link)
                })

                setLinks(linksValues as []) // "as []" remove error
            } catch (e) {
                console.log(e);
                return;
            }
        }

        async function verifyIfIsAdmin() {
            const { id } = params;

            if (id === String(account)) {
                setIsAdmin(true)
            }

            return;
        }

        if (params.id) {
            loadCategories()
            verifyIfIsAdmin()
            setUsername(params.id)
        }
    }, [params, params.id])

    async function deleteLink(id: string) {
        await api.delete(`/links/${id}`);
    }

    if (isAdmin) {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid item xs={10} className={classes.titleContainer}>
                        <Typography
                            variant="h3"
                            className={classes.title}
                        >
                            {username}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.buttonNewLinkContainer}>
                        <Button className={classes.buttonNewLink}>
                            Novo link
                        </Button>
                    </Grid>
                </Grid>
                <div>
                    {categories.map((category: Category) => (
                        <div className={classes.category}>
                            <Typography
                                variant='h4'
                                key={category.id}
                                className={classes.categoryName}
                            >
                                {category.name}
                            </Typography>
                            <div>
                                {links.filter((link: Link) => link.category_id === category.id).map((link: Link) => (
                                    <Grid
                                        container
                                        spacing={3}
                                        key={link.id}
                                        className={classes.link}
                                    >
                                        <Grid item xs={3}>
                                            <Button className={classes.button}>
                                                {link.title}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography
                                                variant='overline'
                                                className={classes.description}
                                            >
                                                {link.description}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1}
                                            className={classes.trashBin}
                                        >
                                            <IconButton
                                                color="primary"
                                                aria-label="delete link"
                                                size="small"
                                                onClick={() => deleteLink(link.id)}
                                            >
                                                <BsFillTrashFill />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Paper>
        )
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <div>
                {categories.map((category: Category) => (
                    <div className={classes.category}>
                        <Typography
                            variant='h4'
                            key={category.id}
                            className={classes.categoryName}
                        >
                            {category.name}
                        </Typography>
                        <div>
                            {links.filter((link: Link) => link.category_id === category.id).map((link: Link) => (
                                <Grid
                                    container
                                    spacing={3}
                                    key={link.id}
                                    className={classes.link}
                                >
                                    <Grid item xs={3}>
                                        <Button className={classes.button}>
                                            {link.title}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography
                                            variant='overline'
                                            className={classes.description}
                                        >
                                            {link.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Paper>
    )
}

export default AccountLinks