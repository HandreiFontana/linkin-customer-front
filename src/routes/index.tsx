import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/sign-in';

import Route from './route';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/signin" exact component={SignIn} />
    </Switch>
)

export default Routes;