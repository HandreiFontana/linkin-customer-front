import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';


interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ component: Component, isPrivate = false, ...rest }) => {
    const { account } = useAuth();

    if (!account && isPrivate) {
        return <Redirect to="/" />
    }

    // if (account && !isPrivate) {
    //     return <Redirect to="/dashboard" />;
    // }

    const Layout = account ? DefaultLayout : AuthLayout;

    return (
        <ReactDOMRoute
            {...rest}
            render={props => (
                <Layout>
                    <Component />
                </Layout>
            )}
        />
    )
}

export default Route;