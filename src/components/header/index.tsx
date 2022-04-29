import React from 'react';

import { AppBar, Container, Grid } from '@material-ui/core';

import logo from '../../assets/logo.svg';

import SignInButton from '../sign-in-button';

import { useStyles } from './styles'

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container className={classes.container}>
                <Grid container className={classes.grids}>
                    <Grid item xs={10} className={classes.grid}>
                        <img src={logo} alt="Linkin" className={classes.logo} />
                    </Grid>
                    <Grid item xs={2} className={classes.grid}>
                        <SignInButton />
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}

export default Header;