import { merge } from "lodash";
import { createStore } from "redux";

import { Subject } from './types';
import * as config from './config';

import { AppState,
    AppActions,
    SUBMIT_FORM,
    LOGIN_REQUEST_RECEIVED,
    MARKS_REQUEST_RECEIVED,
    REMEMBER_LOGIN
 } from './types';
import { login_request_received, marks_request_received } from './actions';

const initialState: AppState = {
    // TODO: add api request to get username, maybe during login?
    username: 'Andrea',
    loginInProgress: false,
    logged: false,
    logError: "",
    marks: {
        reqInProgress: false,
        data: null,
        reqError: ""
    }
};

// TODO: only for debugging
export const store = createStore(reducer, (window as any).devToolsExtension && (window as any).devToolsExtension());

// !!CAUTION!! this import needs to be after the store is exported since it requires it
// importing it before will create a "cannot read property: dispatch of undefined" error
// since the appstorage will try to dispatch an action to the store with hasn't been created yet
import { AppStorage, LOGGED_KEY } from './appStorage';

export function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            {
                const { username, password } = action as SUBMIT_FORM;
                const key = window.crypto.getRandomValues(new Uint32Array(1));

                if (username === "" || password === "") {
                    return merge({}, state, {logError: "Please insert a username and/or password"});
                }

                // TODO: temporary backdoor
                if (username === "d" && password === "d") {
                    AppStorage.setItem(LOGGED_KEY, 'true');
                    return merge({}, state, {logged: true});
                }

                // Api request
                const req = new XMLHttpRequest();
                const url = config.api_url + "/login";
                req.open('POST', url, true);
                req.withCredentials = true;

                const params = `login=${username}&password=${password}&key=${key}`;
                req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                req.onreadystatechange = () => {
                    if (req.readyState === 4) {
                        store.dispatch(login_request_received(req.status));
                    }
                };

                req.send(params);
                return merge({}, state, {loginInProgress: true});
            }

        case 'LOGIN_REQUEST_RECEIVED':
            let reqStatus = (action as LOGIN_REQUEST_RECEIVED).reqStatus;
            if (reqStatus === 200) {
                AppStorage.setItem(LOGGED_KEY, 'true');
                return merge({}, state, { logError: "", logged: true, loginInProgress: false});
            } else if (reqStatus === 401) {
                return merge({}, state, {logError: "Login failed", loginInProgress: false});
            } else if (reqStatus === 500) {
                return merge({}, state, {logError: "Server Error", loginInProgress: false});
            } else {
                return merge({}, state, {logError: "Unknown Error", loginInProgress: false});
            }

        case 'GET_MARKS':
            {
                const req = new XMLHttpRequest();
                const url = config.api_url + "/marks";

                req.open('GET', url, true);
                req.withCredentials = true;

                req.onreadystatechange = () => {
                        if (req.readyState === 4) {
                            store.dispatch(marks_request_received(req.status, req.response));
                        }
                };

                req.send();
                return merge({}, state, { marks: {reqInProgress: true}});
            }
        case 'MARKS_REQUEST_RECEIVED':
            {
                const { reqStatus, reqData } = action as MARKS_REQUEST_RECEIVED;
                if (reqStatus === 200) {
                    let parsedData: Array<Subject>;
                    try {
                        parsedData = JSON.parse(reqData);
                    } catch(e) {
                        return merge({}, state, { marks: {reqInProgress: false, reqError: "Error parsing data"}});
                    }
                    return merge({}, state, { marks: {reqInProgress: false, data: parsedData}});
                } else {
                    return merge({}, state, { marks: {reqInProgress: false, reqError: "Error fetching data"}});
                }
            }
        case 'LOGOUT':
            AppStorage.setItem(LOGGED_KEY, "false"); 
            return merge({}, state, {logged: false});
        case 'REMEMBER_LOGIN':
            const { logged } = action as REMEMBER_LOGIN;
            return merge({}, state, {logged: logged});
        default:
            return state;
    }
};
