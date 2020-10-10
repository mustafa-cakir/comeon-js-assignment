import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Root from './core/Root';
import './assets/styles/semantic.css';
import './assets/styles/styles.css';
import store from './core/store';
import configAxios from './core/config/axios-config';

configAxios(); // init config for Axios before initing the react, (ie: set baseUrl, handle null error messages, interceptions etc..)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Root />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
