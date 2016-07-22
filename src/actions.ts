import { LOGIN_REQUEST_RECEIVED, SUBMIT_FORM, MARKS_REQUEST_RECEIVED } from './types';

export function login_request_received(reqStatus: number): LOGIN_REQUEST_RECEIVED {
    return {
        type: 'LOGIN_REQUEST_RECEIVED',
        reqStatus: reqStatus
    };
}

export function submit_form(username: string, password: string): SUBMIT_FORM {
    return {
        type: 'SUBMIT_FORM',
        username: username,
        password: password
    };
}

export function get_marks() {
    return {
        type: 'GET_MARKS'
    };
}

export function marks_request_received(status: number, data: string): MARKS_REQUEST_RECEIVED {
    return {
        type: 'MARKS_REQUEST_RECEIVED',
        reqStatus: status,
        reqData: data
    };
}
