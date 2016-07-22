import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import { Hello } from './components/Hello';
import { LoginForm } from './components/LoginForm';
import { Marks } from './components/Marks';
import { App } from './components/App';
import { store } from './reducer';

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
    document.getElementById("root")
);
