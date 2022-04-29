import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { GrLogin } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";

import { useAuth } from "../../context/auth-context";

import { useStyles } from './styles';

const SignInButton: React.FC = () => {
    const classes = useStyles();

    const { account } = useAuth();

    if (!account) {
        return (
            <Button
                variant="contained"
                component={Link}
                to="/signin"
                className={classes.button}
            >
                <GrLogin className={classes.loginIcon} />
                Entrar
            </Button>
        )
    }

    return (
        <Button
            variant="contained"
            className={classes.button}
        >
            <FaUserAlt className={classes.loginIcon} />
            {account}
        </Button>
    )
}

export default SignInButton;