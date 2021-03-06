export type Subject = {
    name: string,
    marks: Array<Mark>
};

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
};


export interface CommunicationDescription {
    longTitle: string;
    desc: string;
    attachment: boolean;
}

export type ApiCall<T> = {
    reqInProgress: boolean;
    data: T | null;
    reqError: string;
};

export interface OnLogoutRedirectComponent {
    router: any;
    logged: boolean;
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
        descriptions: { [key: string]: CommunicationDescription }
    };
    files: ApiCall<Array<FileTeacher>>;
    absences: ApiCall<Absences>;
    subjectTeachers: ApiCall<Array<SubjectTeacher>>,
    lessons: { [key: string]: ApiCall<Array<Lesson>> }
};

export type SubjectTeacher = {
    name: string;
    code: number;
    teacherCodes: Array<number>;
};

export type Lesson = {
    teacher: string;
    date: string;
    content: string;
};

export interface Absence {
    id: number;
    from: string;
    to: string;
    days: Number;
    justification?: string;
    done: boolean;
}

export interface Delay {
    id: number;
    day: string;
    done: boolean;
    hour: string;
    justification?: string;
}

export interface Exit { }

export interface Absences {
    absences?: Absence[];
    delays?: Delay[];
    exits?: Exit[];
}

export interface SUBMIT_FORM {
    type: "SUBMIT_FORM";
    username: string;
    password: string;
}

export interface LOGIN_REQUEST_RECEIVED {
    type: "LOGIN_REQUEST_RECEIVED";
    reqData: string;
}

export interface GET_MARKS {
    type: "GET_MARKS";
}

export interface COMMUNICATIONS_REQUEST_RECEIVED {
    type: "COMMUNICATIONS_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: string;
}

export interface MARKS_REQUEST_RECEIVED {
    type: "MARKS_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: string;
}

export interface LOGOUT {
    type: "LOGOUT";
}

export interface REMEMBER_LOGIN {
    type: "REMEMBER_LOGIN";
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

export interface SUBJECT_TEACHERS_REQUEST_SENT {
    type: "SUBJECT_TEACHERS_REQUEST_SENT";
}

export interface SUBJECT_TEACHERS_REQUEST_RECEIVED {
    type: "SUBJECT_TEACHERS_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: string;
}

export interface LESSONS_REQUEST_SENT {
    type: "LESSONS_REQUEST_SENT";
    subjectId: string;
}

export interface LESSONS_REQUEST_RECEIVED {
    subjectId: string;
    type: "LESSONS_REQUEST_RECEIVED";
    reqStatus: number;
    reqData: string;
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
    | ABSENCES_REQUEST_RECEIVED
    | SUBJECT_TEACHERS_REQUEST_RECEIVED
    | SUBJECT_TEACHERS_REQUEST_SENT
    | LESSONS_REQUEST_RECEIVED
    | LESSONS_REQUEST_SENT;
