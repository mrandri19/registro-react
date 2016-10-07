export type Subject = {
    name: string,
    marks: Array<Mark>
}

export interface SET_LOGGED {
    type: "SET_LOGGED";
    logged: boolean;
}

export interface Communication {
    title: string;
    type: string;
    date: string;
    id: number;
}

export interface LOGIN_REQUEST_SENT {
    type: "LOGIN_REQUEST_SENT";
}

export interface FORM_ERROR {
    type: "FORM_ERROR";
    error: string;
}

export type Mark = {
    date: string,
    desc: string,
    mark: string,
    ns: boolean,
    q: "q1" | "q3",
    type: string
}


export interface CommunicationDescription {
    longTitle: string;
    desc: string;
    attachment: boolean;
}

type ApiCall<T> = {
    reqInProgress: boolean;
    data: T | null;
    reqError: string;
}

export type AppState = {
    username: string | null;
    logged: boolean;
    loginInProgress: boolean;
    logError: string;
    marks: ApiCall<Array<Subject>>,
    communications: {
        reqInProgress: boolean;
        data: Array<Communication> | null;
        reqError: string;
        descriptions: IPORCODIO;
    },
    files: ApiCall<Array<FileTeacher>>,
    absences: ApiCall<AllAbsences>
}

export interface Absence {
    id: number;
    from: string;
    to: string;
    days: Number;
    justification?: string;
}

export interface Delay {
    id: number;
    day: string;
    hours: string;
    justification?: string;
};

export interface Exit { }

export interface Absences {
    absences?: Absence[];
    delays?: Delay[];
    exits?: Exit[];
}

export interface AllAbsences {
    undone?: Absences;
    done: Absences;
}

export interface IPORCODIO {
    [key: string]: CommunicationDescription;
}

export interface SUBMIT_FORM {
    type: 'SUBMIT_FORM';
    username: string;
    password: string;
}

export interface LOGIN_REQUEST_RECEIVED {
    type: 'LOGIN_REQUEST_RECEIVED';
    reqData: string;
}

export interface GET_MARKS {
    type: 'GET_MARKS';
}

export interface COMMUNICATIONS_REQUEST_RECEIVED {
    type: 'COMMUNICATIONS_REQUEST_RECEIVED';
    reqStatus: number;
    reqData: string;
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

export interface COMMUNICATIONS_REQUEST_SENT {
    type: "COMMUNICATIONS_REQUEST_SENT";
}

export interface COMMUNICATION_REQUEST_RECEIVED {
    type: "COMMUNICATION_REQUEST_RECEIVED";
    commID: string;
    reqStatus: number;
    reqData: any;
}

export interface COMMUNICATION_REQUEST_SENT {
    type: "COMMUNICATION_REQUEST_SENT";
    commID: string;
}

export interface FileTeacher {
    name: string;
    folders: Folder[];
}
export interface Folder {
    name: string;
    last: string;
    elements: File[];
}
export interface File {
    id: string;
    name: string;
    type: string;
    date: string;
    cksum: string;
}

export interface FILES_REQUEST_RECEIVED {
    type: "FILES_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: any;
}

export interface FILES_REQUEST_SENT {
    type: "FILES_REQUEST_SENT";
}

export interface MARKS_REQUEST_SENT {
    type: "MARKS_REQUEST_SENT";
}

export interface ABSENCES_REQUEST_RECEIVED {
    type: "ABSENCES_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: any;
}

export interface ABSENCES_REQUEST_SENT {
    type: "ABSENCES_REQUEST_SENT";
}

export type AppActions = LOGIN_REQUEST_RECEIVED
    | LOGIN_REQUEST_SENT
    | GET_MARKS
    | MARKS_REQUEST_SENT
    | MARKS_REQUEST_RECEIVED
    | LOGOUT
    | REMEMBER_LOGIN
    | FORM_ERROR
    | SET_LOGGED
    | COMMUNICATIONS_REQUEST_SENT
    | COMMUNICATIONS_REQUEST_RECEIVED
    | COMMUNICATION_REQUEST_RECEIVED
    | COMMUNICATION_REQUEST_SENT
    | FILES_REQUEST_SENT
    | FILES_REQUEST_RECEIVED
    | ABSENCES_REQUEST_SENT
    | ABSENCES_REQUEST_RECEIVED;
