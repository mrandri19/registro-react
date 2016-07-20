import { LOGIN_REQUEST_RECEIVED } from './types';

export function login_request_received(reqStatus: number): LOGIN_REQUEST_RECEIVED {
    return {
        type: 'LOGIN_REQUEST_RECEIVED',
        reqStatus: reqStatus
    }
}