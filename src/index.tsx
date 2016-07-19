import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { merge } from "lodash";

import { Hello } from './components/Hello';
import { Input } from './components/Input';
import { AppState, AppActions, SUBMIT_FORM, DAW } from './types';

const initialState: AppState = {
    username: 'Andrea',
    logged: false
}

function reducer(state = initialState, action: AppActions): AppState {
    console.log(state);
    switch (action.type) {
        case 'SUBMIT_FORM':
            const formData = action as SUBMIT_FORM;
            console.log('username:', formData.username, 'password:', formData.password);
            
            return merge({}, state, {logged: true});

        case 'DAW':
            console.log((action as DAW).name);
            return state;

        default:
            return state;
    }
};

const store = createStore(reducer);

function App(props: any) {
    return (<div>
        <h1>App</h1>
        <Link to="/">Home</Link>
        <Link to="marks">Marks</Link>
        {props.children}
    </div>);
}

function Login(props:any) {
    return (<div>
        <Hello />
        <Input />
    </div>);
}

function Marks(props:any) {
    return (<p>Your marks</p>);
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login} />
                <Route path="marks" component={Marks}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("example")
);