import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import { Hello } from './components/Hello';
import { LoginForm } from './components/LoginForm';
import { Marks } from './components/Marks';
import { App } from './components/App';
import { store } from './reducer';
import { AppStorage, LOGGED_KEY } from './appStorage';

function Login(props: any) {
    return (<div>
        <h2>Please login</h2>
        <LoginForm />
    </div>);
}

/**
 * Redirect to login route if neither AppState.logged nor 
 * LocalStorage.getItem('logged') are true
 */
function checkAuth(nextState: any, replace: any) {
    const savedLogin = AppStorage.getItem(LOGGED_KEY) === "true";
    const alreadyLogged = store.getState().logged;
    if (!(savedLogin || alreadyLogged)) {
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
                <Route path="login" component={Login}></Route>// TODO: Implement persistence
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);
