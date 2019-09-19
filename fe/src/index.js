import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/globals.css';
import App from './components/app';
import{ BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render( <BrowserRouter>
        <Route path="/:filter?" component={App} />
    </BrowserRouter>, 
    document.getElementById('root'));