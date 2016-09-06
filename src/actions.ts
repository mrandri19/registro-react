import * as ApiWrapper from "./apiWrapper";
import {
    LOGIN_REQUEST_RECEIVED,
    LOGIN_REQUEST_SENT,
    MARKS_REQUEST_RECEIVED,
    LOGOUT,
    REMEMBER_LOGIN,
    FORM_ERROR,
    SET_LOGGED,
    COMMUNICATIONS_REQUEST_SENT,
    COMMUNICATIONS_REQUEST_RECEIVED
} from "./types";
import { AppStorage, LOGGED_KEY } from "./appStorage";

export function login_request_received(): LOGIN_REQUEST_RECEIVED {
    return {
        type: "LOGIN_REQUEST_RECEIVED",
    };
}

export function form_error(error: string): FORM_ERROR {
    return {
        type: "FORM_ERROR",
        error: error
    };
}
function set_logged(logged: boolean): SET_LOGGED {
    return {
        type: "SET_LOGGED",
        logged: logged
    };
}

export function submit_form(username: string, password: string): (dispatch: any) => void {
    return dispatch => {
        const key = window.crypto.getRandomValues(new Uint32Array(1));

        if (username === "" || password === "") {
            dispatch(form_error("Please insert a username and/or password"));
            return;
        }

        dispatch(login_request_sent());

        ApiWrapper.login(username, password, key, (status: number) => {
            if (status === 200) {
                AppStorage.setItem(LOGGED_KEY, "true");
                dispatch(set_logged(true));
                dispatch(login_request_received());
            } else if (status === 401) {
                dispatch(form_error("Login failed"));
                dispatch(set_logged(false));
                dispatch(login_request_received());
            } else if (status === 500) {
                dispatch(form_error("Server error"));
                dispatch(set_logged(false));
                dispatch(login_request_received());
            } else {
                dispatch(form_error("Unknown error"));
                dispatch(set_logged(false));
                dispatch(login_request_received());
            }
        });
        return;
    };
}

export function login_request_sent(): LOGIN_REQUEST_SENT {
    return {
        type: "LOGIN_REQUEST_SENT"
    };
}

export function get_marks(): (dispatch: any) => void {
    return dispatch => {
        dispatch(marks_request_sent());
        ApiWrapper.marks((status, response) => {
            dispatch(marks_request_received(status, response));
        });
        return;
    };
}

function communications_request_sent(): COMMUNICATIONS_REQUEST_SENT {
    return {
        type: "COMMUNICATIONS_REQUEST_SENT"
    };
}

function communications_request_received(status: number, data: string): COMMUNICATIONS_REQUEST_RECEIVED {
    return {
        type: "COMMUNICATIONS_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data
    };
}


export function get_communications(): (dispatch: any) => void {
    return dispatch => {
        dispatch(communications_request_sent());
        ApiWrapper.communications((status, response) => {
            dispatch(communications_request_received(status, response));
        });
        return;
    };
}

function marks_request_sent() {
    return {
        type: "MARKS_REQUEST_SENT"
    };
}

export function marks_request_received(status: number, data: string): MARKS_REQUEST_RECEIVED {
    return {
        type: "MARKS_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data
    };
}

export function logout(): LOGOUT {
    return {
        type: "LOGOUT"
    };
}

export function remember_login(logged: boolean): REMEMBER_LOGIN {
    return {
        type: "REMEMBER_LOGIN",
        logged: logged
    };
}
