import React from 'react';
import { GrLogin } from 'react-icons/gr';

import { AppBar, Button, Toolbar } from '@material-ui/core';

import logo from '../../assets/logo.svg';

import { useStyles } from './styles'

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <img src={logo} alt="Linkin" className={classes.logo} />

                <Button className={classes.button}>
                    <GrLogin className={classes.loginIcon} />
                    Entrar
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;