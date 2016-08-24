import { merge } from "lodash";
import { createStore, applyMiddleware } from "redux";
import { default as thunk } from "redux-thunk";

import { AppStorage, LOGGED_KEY } from "./appStorage";
import { Subject } from "./types";

import { AppState,
    AppActions,
    LOGIN_REQUEST_RECEIVED,
    MARKS_REQUEST_RECEIVED,
    REMEMBER_LOGIN,
    FORM_ERROR,
    SET_LOGGED
 } from "./types";
import { marks_request_received } from "./actions";

const initialState: AppState = {
    // TODO: add api request to get username, maybe during login?
    username: "Andrea",
    loginInProgress: false,
    logged: false,
    logError: "",
    marks: {
        reqInProgress: false,
        data: null,
        reqError: ""
    }
};

type Reducer = (state: AppState, action: AppActions) => AppState;

export function storeFactory(reducer: Reducer) {
    return createStore(reducer, applyMiddleware(thunk));
}


export function reducerFactory(ApiWrapper: any): Reducer {
    return function reducer(state = initialState, action: AppActions): AppState {
        switch (action.type) {
            case "SET_LOGGED":
            {
                let { logged } = action as SET_LOGGED;
                return merge({}, state, { logged: logged });
            }
            case "FORM_ERROR":
                let { error } = action as FORM_ERROR;
                return merge({}, state, {logError: error});
            case "LOGIN_REQUEST_SENT":
                return merge({}, state, {loginInProgress: true});
            case "LOGIN_REQUEST_RECEIVED":
                return merge({}, state, { loginInProgress: false });
            case "GET_MARKS":
                {
                    ApiWrapper.marks((status, response) => {
                        store.dispatch(marks_request_received(status, response));
                    });
                    return merge({}, state, { marks: {reqInProgress: true}});
                }
            case "MARKS_REQUEST_RECEIVED":
                {
                    const { reqStatus, reqData } = action as MARKS_REQUEST_RECEIVED;
                    if (reqStatus === 200) {
                        let parsedData: Array<Subject>;
                        try {
                            parsedData = JSON.parse(reqData);
                        } catch (e) {
                            return merge({}, state, { marks: {reqInProgress: false, reqError: "Error parsing data"}});
                        }
                        return merge({}, state, { marks: {reqInProgress: false, data: parsedData, reqError: ""}});
                    } else if (reqStatus === 403) {
                        return merge({}, state, { marks: {reqInProgress: false, reqError: "You need to login again"}, logged: false});
                    } else {
                        return merge({}, state, { marks: {reqInProgress: false, reqError: "Error fetching data"}});
                    }
                }
            case "LOGOUT":
                AppStorage.setItem(LOGGED_KEY, "false");
                return merge({}, state, {logged: false});
            case "REMEMBER_LOGIN":
                const { logged } = action as REMEMBER_LOGIN;
                return merge({}, state, {logged: logged});
            default:
                return state;
        }
    };
}
