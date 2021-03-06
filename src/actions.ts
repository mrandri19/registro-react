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
    COMMUNICATIONS_REQUEST_RECEIVED,
    COMMUNICATION_REQUEST_RECEIVED,
    COMMUNICATION_REQUEST_SENT,
    FILES_REQUEST_RECEIVED,
    FILES_REQUEST_SENT,
    ABSENCES_REQUEST_RECEIVED,
    ABSENCES_REQUEST_SENT,
    SUBJECT_TEACHERS_REQUEST_SENT,
    SUBJECT_TEACHERS_REQUEST_RECEIVED,
    LESSONS_REQUEST_RECEIVED,
    LESSONS_REQUEST_SENT
} from "./types";

import { AppStorage, LOGGED_KEY, SECRET_KEY_KEY } from "./appStorage";

export function login_request_received(reqData: string): LOGIN_REQUEST_RECEIVED {
    return {
        type: "LOGIN_REQUEST_RECEIVED",
        reqData: reqData
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
        let key: any;
        let tryGetKey = AppStorage.getItem(SECRET_KEY_KEY);
        if (tryGetKey === null) {
            key = window.crypto.getRandomValues(new Uint32Array(1));
            AppStorage.setItem(SECRET_KEY_KEY, key);
        } else {
            key = tryGetKey;
        }

        if (username === "" || password === "") {
            dispatch(form_error("Inserisci username/password per favore"));
            return;
        }

        dispatch(login_request_sent());

        // TODO: move logic to reducer, where it should be
        ApiWrapper.login(username, password, key, (status: number, response: string) => {
            if (status === 200) {
                AppStorage.setItem(LOGGED_KEY, "true");
                dispatch(set_logged(true));
                dispatch(login_request_received(response));
            } else if (status === 401) {
                dispatch(form_error("Nome utente/password sbagliati"));
                dispatch(set_logged(false));
                dispatch(login_request_received(response));
            } else if (status === 500) {
                dispatch(form_error("Errore server"));
                dispatch(set_logged(false));
                dispatch(login_request_received(response));
            } else {
                dispatch(form_error("Errore sconosciuto"));
                dispatch(set_logged(false));
                dispatch(login_request_received(response));
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

export function get_communication(commID: string): (dispatch: any) => void {
    return dispatch => {
        dispatch(communication_request_sent(commID));
        ApiWrapper.communication(commID, (status, response) => {
            dispatch(communication_request_received(commID, status, response));
        });
        return;
    };
}

export function communication_request_sent(commID: string): COMMUNICATION_REQUEST_SENT {
    return {
        type: "COMMUNICATION_REQUEST_SENT",
        commID: commID,
    };
}


export function communication_request_received(commID: string, status: number, data: string): COMMUNICATION_REQUEST_RECEIVED {
    return {
        type: "COMMUNICATION_REQUEST_RECEIVED",
        commID: commID,
        reqStatus: status,
        reqData: data
    };
}

export function get_files(): (dispatch: any) => void {
    return dispatch => {
        dispatch(files_request_sent());
        ApiWrapper.files((status, response) => {
            dispatch(files_request_received(status, response));
        });
        return;
    };
};

export function files_request_sent(): FILES_REQUEST_SENT {
    return {
        type: "FILES_REQUEST_SENT",
    };
}

export function files_request_received(status: number, data: string): FILES_REQUEST_RECEIVED {
    return {
        type: "FILES_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data
    };
}

function absences_request_sent(): ABSENCES_REQUEST_SENT {
    return {
        type: "ABSENCES_REQUEST_SENT",
    };
}

function absences_request_received(status: number, data: string): ABSENCES_REQUEST_RECEIVED {
    return {
        type: "ABSENCES_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data
    };
}

export function get_absences(): (dispatch: any) => void {
    return dispatch => {
        dispatch(absences_request_sent());
        ApiWrapper.absences((status, response) => {
            dispatch(absences_request_received(status, response));
        });
        return;
    };
}

function subjectTeachers_request_sent(): SUBJECT_TEACHERS_REQUEST_SENT {
    return {
        type: "SUBJECT_TEACHERS_REQUEST_SENT"
    };
}

function subjectTeachers_request_received(status: number, data: string): SUBJECT_TEACHERS_REQUEST_RECEIVED {
    return {
        type: "SUBJECT_TEACHERS_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data
    };
}


export function get_subjectTeachers(): (dispatch: any) => void {
    return dispatch => {
        dispatch(subjectTeachers_request_sent());
        ApiWrapper.subjectTeachers((status, response) => {
            dispatch(subjectTeachers_request_received(status, response));
        });
        return;
    };
}

export function get_lesson(subjectId: string, teacherCodes: number[]): (dispatch: any) => void {
    return dispatch => {
        dispatch(lesson_request_sent(subjectId));
        ApiWrapper.lesson(subjectId, teacherCodes, (status, response) => {
            dispatch(lesson_request_received(status, response, subjectId));
        });
        return;
    };
}

export function lesson_request_sent(id: string): LESSONS_REQUEST_SENT {
    return {
        type: "LESSONS_REQUEST_SENT",
        subjectId: id
    };
}
export function lesson_request_received(status: number, data: string, id: string): LESSONS_REQUEST_RECEIVED {
    return {
        type: "LESSONS_REQUEST_RECEIVED",
        reqStatus: status,
        reqData: data,
        subjectId: id
    };
}
