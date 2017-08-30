import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import App from "./container/App/index";
import Card from "./components/Card/index";

import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

export const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>

);
