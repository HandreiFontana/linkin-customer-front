import React from 'react';

import Header from '../../../components/header';

import { useStyles } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
};

export default DefaultLayout