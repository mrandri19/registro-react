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
  date: Date;
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

export type AppState = {
    username: string,
    logged: boolean
    loginInProgress: boolean,
    logError: string,
    marks: {
        reqInProgress: boolean,
        data?: Array<Subject>,
        reqError: string
    },
    communications: {
        reqInProgress: boolean,
        data?: Array<Communication>,
        reqError: string,
        descriptions: IPORCODIO
    },
    files: {
        reqInProgress: boolean,
        data?: Array<FileTeacher>,
        reqError: string
    }
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

export type AppActions = LOGIN_REQUEST_RECEIVED
                         | GET_MARKS
                         | MARKS_REQUEST_RECEIVED
                         | LOGOUT
                         | REMEMBER_LOGIN
                         | FORM_ERROR
                         | SET_LOGGED
                         | COMMUNICATIONS_REQUEST_SENT
                         | COMMUNICATIONS_REQUEST_RECEIVED
                         | COMMUNICATION_REQUEST_RECEIVED
                         | COMMUNICATION_REQUEST_SENT
                         | FILES_REQUEST_RECEIVED;
