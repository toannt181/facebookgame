import React from 'react';
import ReactDom from 'react-dom';

import store from './store/store';
import {Root} from "./Root";
import {Provider} from 'react-redux';


ReactDom.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app-root')
);