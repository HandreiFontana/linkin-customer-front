import React from 'react';
import { Switch } from 'react-router-dom';

import LandingPage from '../pages/landing-page';

import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import AccountLinks from '../pages/account-links';

import Route from './route';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact defaultLayout component={LandingPage} />

        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />

        <Route path="/:id" exact defaultLayout component={AccountLinks} />
    </Switch>
)

export default Routes;