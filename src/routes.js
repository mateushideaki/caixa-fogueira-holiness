import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Caixa from './pages/caixa';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Caixa} />
        </Switch>
    </BrowserRouter>
);

export default Routes;