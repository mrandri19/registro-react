import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Redirect } from "react-router";
import { Provider } from "react-redux";

import { Hello } from "./components/Hello";
import { Marks } from "./components/Marks";
import { Login } from "./components/Login";
import { App } from "./components/App";
import { storeFactory, reducer } from "./reducer";
import * as actions from "./actions";
import * as apiWrapper from "./apiWrapper";
import { AppStorage, LOGGED_KEY } from "./appStorage";

// Setting up the store and its reducer, using dependecy injection
// for the reducer
let appStore = storeFactory(reducer);

// Setting up the localStorage and checking if the user is already logged
// Create the key if it isn't in the storage
if (AppStorage.getItem(LOGGED_KEY) == null) {
    AppStorage.setItem(LOGGED_KEY, "false");
} else {
    const logged = AppStorage.getItem(LOGGED_KEY) === "true";
    appStore.dispatch(actions.remember_login(logged));
}

function logout(nextState: any, replace: any) {
    if (appStore.getState().logged) {
        appStore.dispatch(actions.logout());
    }
}

function checkAuth(nextState: any, replace: any) {
    if (!appStore.getState().logged) {
        replace({
            pathname: "login",
        });
    }
}

ReactDOM.render(
    <Provider store={appStore}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Hello} onEnter={checkAuth}/>
                <Route path="marks" component={Marks} onEnter={checkAuth}></Route>
                <Route path="login" component={Login}></Route>
                <Route path="logout" component={Login} onEnter={logout}></Route>
                <Redirect from="logout" to="login"/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);
