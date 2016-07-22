import { merge } from "lodash";
import { createStore } from "redux";

import { AppState,
    AppActions,
    SUBMIT_FORM,
    LOGIN_REQUEST_RECEIVED,
    GET_MARKS } from './types';
import { login_request_received } from './actions';

const initialState: AppState = {
    username: 'Andrea',
    loginInProgress: false,
    logged: false,
    logError: ""
};

export const store = createStore(reducer, (window as any).devToolsExtension && (window as any).devToolsExtension());

export function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            // Get the data
            const { username, password } = action as SUBMIT_FORM;
            {
                // Make the request
                const req = new XMLHttpRequest();
                const url = "https://api.daniele.ml/login";
                req.open('POST', url, true);
                req.withCredentials = true;
                

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
            }
            return merge({}, state, {loginInProgress: true});

        case 'LOGIN_REQUEST_RECEIVED':
            let reqStatus = (action as LOGIN_REQUEST_RECEIVED).reqStatus;
            if (reqStatus === 200) {
                console.log('login successful');
                return merge({}, state, { logError: "", logged: true, loginInProgress: false});
            } else if (reqStatus === 403) {
                console.log('login failed, 403');
                return merge({}, state, {logError: "Login failed", loginInProgress: false});
            } else if (reqStatus === 401) {
                console.log('login failed, 401');
                return merge({}, state, {logError: "Login failed", loginInProgress: false});
            } else if (reqStatus === 500) {
                console.log('Server error');
                return merge({}, state, {logError: "Server Error", loginInProgress: false});
            }

        case 'GET_MARKS':
            {
                console.log('getting marks');
                const req = new XMLHttpRequest();
                const url = "https://api.daniele.ml/marks";

                req.open('GET', url, true);
                req.withCredentials = true;

                req.onreadystatechange = () => {
                        if (req.readyState === 4) {
                            console.log(req);
                        }
                };

                req.send();
                return state;
            }
        default:
            return state;
    }
};
