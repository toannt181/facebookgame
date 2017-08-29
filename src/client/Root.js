import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import App from "./container/App/index";
import Card from "./components/Card/index";

export const Root = ({store}) => (
    <div>
        <BrowserRouter basename="/">
            <App/>
        </BrowserRouter>
    </div>
);
