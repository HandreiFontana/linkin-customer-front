import React from 'react';
import { Link } from 'react-router-dom';
import { GrLogin } from 'react-icons/gr';

import { AppBar, Button, Container, Grid } from '@material-ui/core';

import logo from '../../assets/logo.svg';

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
                        <Button
                            variant="contained"
                            component={Link}
                            to="/signin"
                            className={classes.button}
                        >
                            <GrLogin className={classes.loginIcon} />
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}

export default Header;