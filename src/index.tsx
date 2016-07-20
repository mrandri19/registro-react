import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { merge } from "lodash";

import { Hello } from './components/Hello';
import { LoginForm } from './components/LoginForm';
import { Marks } from './components/Marks';
import { App } from './components/App';

import { AppState, AppActions, SUBMIT_FORM, DAW } from './types';

const initialState: AppState = {
    username: 'Andrea',
    logged: false
}

function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            const { username, password } = action as SUBMIT_FORM;

            return merge({}, state, {logged: true});

        case 'DAW':
            console.log((action as DAW).name);
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