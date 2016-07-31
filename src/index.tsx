import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import { Hello } from './components/Hello';
import { Marks } from './components/Marks';
import { Login } from './components/Login';
import { App } from './components/App';
import { store } from './reducer';
import * as actions from './actions';

function logout(nextState: any, replace: any) {
    if(store.getState().logged) {
        store.dispatch(actions.logout());
    }
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
                <Route path="logout" component={Login} onEnter={logout}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);
