import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { merge } from "lodash";

import { login_request_received } from './actions';
import { Hello } from './components/Hello';
import { LoginForm } from './components/LoginForm';
import { Marks } from './components/Marks';
import { App } from './components/App';

import { AppState, AppActions, SUBMIT_FORM, LOGIN_REQUEST_RECEIVED } from './types';

const initialState: AppState = {
    username: 'Andrea',
    loginInProgess: false,
    logged: false
}

function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            // Get the data
            const { username, password } = action as SUBMIT_FORM;

            // Make the request
            const req = new XMLHttpRequest();
            const url = "https://api.daniele.ml/login";
            req.open('POST', url, true);

            // TODO: make builder
            const params = "login=S1122860H&password=ca38855b";
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            req.onreadystatechange = () => {
                if(req.readyState == 4) {
                    store.dispatch(login_request_received(req.status));
                }
            };

            req.send(params);
            return merge({}, state, {loginInProgress: true});

        case 'LOGIN_REQUEST_RECEIVED':
            console.log((action as LOGIN_REQUEST_RECEIVED).reqStatus);
            return state;

        default:
            return state;
    }
};

const store = createStore(reducer);

function Login(props:any) {
    return (<div>
        <h1>Please login</h1>
        <LoginForm />
    </div>);
}

function checkAuth(nextState: any, replace: any) {
    if(!store.getState().logged) {
        replace({
            pathname: 'login',
        });
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Hello} onEnter={checkAuth}/>
                <Route path="marks" component={Marks} onEnter={checkAuth}></Route>
                <Route path="login" component={Login}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("example")
);