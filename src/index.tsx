import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { merge } from "lodash";

import { login_request_received } from './actions';
import { Hello } from './components/Hello';
import { LoginForm } from './components/LoginForm';
import { Marks } from './components/Marks';
import { App } from './components/App';

import { AppState,
    AppActions,
    SUBMIT_FORM,
    LOGIN_REQUEST_RECEIVED } from './types';

const initialState: AppState = {
    username: 'Andrea',
    loginInProgress: false,
    logged: false,
    logError: ""
};

function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            // Get the data
            const { username, password } = action as SUBMIT_FORM;

            // Make the request
            const req = new XMLHttpRequest();
            const url = "https://api.daniele.ml/login";
            req.open('POST', url, true);

            if (username === "" || password === "") {
                return merge({}, state, {logError: "Please insert a username and/or password"});
            }

            // S1122860H
            const params = `login=${username}&password=${password}`;
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    store.dispatch(login_request_received(req.status));
                }
            };

            req.send(params);
            return merge({}, state, {loginInProgress: true});

        case 'LOGIN_REQUEST_RECEIVED':
            let reqStatus = (action as LOGIN_REQUEST_RECEIVED).reqStatus;
            if (reqStatus === 200) {
                console.log('login successful');
                return merge({}, state, { logged: true, loginInProgess: false});
            } else if (reqStatus === 403) {
                console.log('login failed, 403');
                return merge({}, state, {logError: "Login failed", loginInProgress: false});
            } else if (reqStatus === 401) {
                console.log(state);
                console.log(merge({}, state, {logError: "Login failed", loginInProgress: false}));

                console.log('login failed, 401');
                return merge({}, state, {logError: "Login failed", loginInProgress: false});
            } else if (reqStatus === 500) {
                console.log('Server error');
                return merge({}, state, {logError: "Server Error", loginInProgress: false});
            }

        default:
            return state;
    }
};

const store = createStore(reducer, (window as any).devToolsExtension && (window as any).devToolsExtension());

function Login(props: any) {
    return (<div>
        <h2>Please login</h2>
        <LoginForm />
    </div>);
}

function checkAuth(nextState: any, replace: any) {
    if (!store.getState().logged) {
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
