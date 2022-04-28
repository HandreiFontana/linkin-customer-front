import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Container, Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';

import example from '../../assets/example.jpg';


const LandingPage: React.FC = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <div className={classes.hero}>
                        <Typography
                            variant="h2"
                            className={classes.title}
                        >Comece a salvar seus <strong className={classes.strong}>links</strong> agora mesmo!</Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/signup"
                            className={classes.button}
                        >
                            Registre-se
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.heroImage}>
                        <img src={example} alt="Exemplo de página" className={classes.image} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LandingPage;