import * as actions from './actions';

export type AppState = {
    username: string,
    logged: boolean
    loginInProgess: boolean,
    logError: string
}

export interface SUBMIT_FORM {
    type: 'SUBMIT_FORM',
    username: string,
    password: string
}

const xx = 'daw';

export interface LOGIN_REQUEST_RECEIVED {
    type: 'LOGIN_REQUEST_RECEIVED',
    reqStatus: number;
}

export type AppActions = SUBMIT_FORM | LOGIN_REQUEST_RECEIVED;