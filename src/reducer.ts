import { merge } from "lodash";
import { createStore, applyMiddleware, compose } from "redux";
import { default as thunk } from "redux-thunk";

import { AppStorage, LOGGED_KEY } from "./appStorage";
import { Subject } from "./types";

import { AppState,
    AppActions,
    MARKS_REQUEST_RECEIVED,
    REMEMBER_LOGIN,
    FORM_ERROR,
    SET_LOGGED,
    COMMUNICATIONS_REQUEST_RECEIVED,
    COMMUNICATION_REQUEST_RECEIVED,
    FILES_REQUEST_RECEIVED,
    Communication,
    FileTeacher
 } from "./types";

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
    },
    communications: {
        reqInProgress: false,
        data: null,
        reqError: "",
        descriptions: {}
    },
    files: {
        reqInProgress: false,
        data: null,
        reqError: ""
    }
};

type Reducer = (state: AppState, action: AppActions) => AppState;

export function storeFactory(reducer: Reducer) {
    // return createStore(reducer, compose(applyMiddleware(thunk), (window as any).devToolsExtension && (window as any).devToolsExtension()));
    return createStore(reducer, applyMiddleware(thunk));
}


export function reducer(state = initialState, action: AppActions): AppState {
        switch (action.type) {
            case "SET_LOGGED":
                {
                    let { logged } = action as SET_LOGGED;
                    return merge({}, state, { logged: logged });
                }
            case "FORM_ERROR":
                {
                    let { error } = action as FORM_ERROR;
                    return merge({}, state, {logError: error});
                }
            case "LOGIN_REQUEST_SENT":
                return merge({}, state, {loginInProgress: true});
            case "LOGIN_REQUEST_RECEIVED":
                return merge({}, state, { loginInProgress: false });
            case "MARKS_REQUEST_SENT":
                return merge({}, state, { marks: {reqInProgress: true}});
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
            case "COMMUNICATIONS_REQUEST_SENT":
                return merge({}, state, { communications: { reqInProgress: true }});
            case "COMMUNICATIONS_REQUEST_RECEIVED":
                {
                    const { reqStatus, reqData } = action as COMMUNICATIONS_REQUEST_RECEIVED;
                    if (reqStatus === 200) {
                        let parsedData: Array<Communication>;
                        try {
                            parsedData = JSON.parse(reqData);
                        } catch (e) {
                            return merge({}, state, { communications: {reqInProgress: false, reqError: "Error parsing data"}});
                        }
                        return merge({}, state, { communications: {reqInProgress: false, data: parsedData, reqError: ""}});
                    } else if (reqStatus === 403) {
                        return merge({}, state, { communications: {reqInProgress: false, reqError: "You need to login again"}, logged: false});
                    } else {
                        return merge({}, state, { communications: {reqInProgress: false, reqError: "Error fetching data"}});
                    }
                }
            case "COMMUNICATION_REQUEST_RECEIVED":
                {
                    let { reqData, commID, reqStatus } = action as COMMUNICATION_REQUEST_RECEIVED;
                    if (reqStatus === 200) {
                        let parsedData: Communication;
                        let d: any = {};
                        try {
                            parsedData = JSON.parse(reqData);
                            d[commID] = parsedData;
                        } catch (e) {
                            console.log("Failed to download", commID);
                        }
                        return merge({}, state, { communications: { descriptions: d }});
                    } else if (reqStatus === 403) {
                        // return merge({}, state, { communications: {reqInProgress: false, reqError: "You need to login again"}, logged: false});
                    } else {
                        // TODO: implement failure
                        // return merge({}, state, { communications: {reqInProgress: false, reqError: "Error fetching data"}});
                    }
                }
            case "COMMUNICATION_REQUEST_SENT":
                // TODO: implement spinner
                return state;
            case "FILES_REQUEST_SENT":
                return merge({}, state, { files: { reqInProgress: true }});
            case "FILES_REQUEST_RECEIVED":
                {
                    const { reqStatus, reqData } = action as FILES_REQUEST_RECEIVED;
                    if (reqStatus === 200) {
                        let parsedData: Array<FileTeacher>;
                        try {
                            parsedData = JSON.parse(reqData);
                        } catch (e) {
                            return merge({}, state, { files: {reqInProgress: false, reqError: "Error parsing data"}});
                        }
                        return merge({}, state, { files: {reqInProgress: false, data: parsedData, reqError: ""}});
                    } else if (reqStatus === 403) {
                        return merge({}, state, { files: {reqInProgress: false, reqError: "You need to login again"}, logged: false});
                    } else {
                        return merge({}, state, { files: {reqInProgress: false, reqError: "Error fetching data"}});
                    }
                }
            default:
                return state;
        }
    };
