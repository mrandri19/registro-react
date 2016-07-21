export type AppState = {
    username: string,
    logged: boolean
    loginInProgress: boolean,
    logError: string
}

export interface SUBMIT_FORM {
    type: 'SUBMIT_FORM';
    username: string;
    password: string;
}

export interface LOGIN_REQUEST_RECEIVED {
    type: 'LOGIN_REQUEST_RECEIVED';
    reqStatus: number;
}

export type AppActions = SUBMIT_FORM | LOGIN_REQUEST_RECEIVED;
