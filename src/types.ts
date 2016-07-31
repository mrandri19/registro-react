export type Subject = {
    name: string,
    marks: Array<Mark>
}

export type Mark = {
    date: string,
    desc: string,
    mark: string,
    ns: boolean,
    q: "q1" | "q3",
    type: string
}

export type AppState = {
    username: string,
    logged: boolean
    loginInProgress: boolean,
    logError: string,
    marks: {
        reqInProgress: boolean,
        data: Array<Subject>,
        reqError: string
    }
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

export interface GET_MARKS {
    type: 'GET_MARKS';
}

export interface MARKS_REQUEST_RECEIVED {
    type: 'MARKS_REQUEST_RECEIVED';
    reqStatus: number;
    reqData: string;
}

export interface LOGOUT {
    type: 'LOGOUT';
}

export interface REMEMBER_LOGIN {
    type: 'REMEMBER_LOGIN';
    logged: boolean;
}

export type AppActions = SUBMIT_FORM
                         | LOGIN_REQUEST_RECEIVED
                         | GET_MARKS
                         | MARKS_REQUEST_RECEIVED
                         | LOGOUT
                         | REMEMBER_LOGIN;
