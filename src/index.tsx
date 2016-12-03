import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Redirect } from "react-router";
import { Provider } from "react-redux";

import { AppState } from "./types";
import { Hello } from "./components/Hello";
import { Marks } from "./components/Marks";
import { Login } from "./components/Login";
import { Files } from "./components/Files";
import { Absences } from "./components/Absences";
import { Communications } from "./components/Communications";
import { CommunicationPage } from "./components/CommunicationPage";
import { App } from "./components/App";
import { SubjectPage } from "./components/SubjectPage";
import { storeFactory, reducer } from "./reducer";
import * as actions from "./actions";
import { AppStorage, LOGGED_KEY } from "./appStorage";

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
    const state = appStore.getState() as AppState;
    if (state.logged) {
        appStore.dispatch(actions.logout());
    }
}

function checkAuth(nextState: any, replace: any) {
    const state = appStore.getState() as AppState;
    if (!state.logged) {
        replace({
            pathname: "login",
        });
    }
}

let mountPoint = document.getElementById("root");

if (mountPoint) {
    ReactDOM.render(
        <Provider store={appStore}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Hello} onEnter={checkAuth} />

                    <Route path="/absences" component={Absences} onEnter={checkAuth}></Route>

                    <Route path="/marks/:subject" component={SubjectPage}></Route>
                    <Route path="/marks" component={Marks} onEnter={checkAuth}></Route>

                    <Route path="/communications/:id" component={CommunicationPage} onEnter={checkAuth}></Route>
                    <Route path="/communications" component={Communications} onEnter={checkAuth}></Route>

                    <Route path="/files" component={Files} onEnter={checkAuth}></Route>

                    <Route path="login" component={Login}></Route>
                    <Route path="logout" component={Login} onEnter={logout}></Route>

                    <Redirect from="*" to="/" />
                </Route>
            </Router>
        </Provider>,
        mountPoint
    );
} else {
    throw new Error("Failed to mount");
}


// Close drawer on click
document.querySelector(".mdl-layout__drawer").addEventListener("click", function () {
    document.querySelector(".mdl-layout__obfuscator").classList.remove("is-visible");
    this.classList.remove("is-visible");
}, false);
