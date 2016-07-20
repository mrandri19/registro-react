import { LOGIN_REQUEST_RECEIVED, SUBMIT_FORM } from './types';

export function login_request_received(reqStatus: number): LOGIN_REQUEST_RECEIVED {
    return {
        type: 'LOGIN_REQUEST_RECEIVED',
        reqStatus: reqStatus
    }
}

export function submit_form(username: string, password: string): SUBMIT_FORM {
    return {
        type: 'SUBMIT_FORM',
        username: username,
        password: password
    }
}