import { merge } from "lodash";
import { createStore, applyMiddleware } from "redux";
import { default as thunk } from "redux-thunk";

import { AppStorage, LOGGED_KEY, USERNAME_KEY } from "./appStorage";
import { Subject } from "./types";

import {
    AppState,
    AppActions,
    Communication,
    COMMUNICATION_REQUEST_RECEIVED,
    FileTeacher,
    Absences,
    SubjectTeacher,
    Lesson
} from "./types";

const initialState: AppState = {
    username: AppStorage.getItem(USERNAME_KEY),
    loginInProgress: false,
    logged: false,
    logError: "",
    marks: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
    communications: {
        reqInProgress: false,
        data: null,
        reqError: "",
        descriptions: {}
    },
    files: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
    absences: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
    subjectTeachers: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
    lessons: {}
};

type Reducer = (state: AppState, action: AppActions) => AppState;

export function storeFactory(reducer: Reducer) {
    // return createStore(reducer, compose(applyMiddleware(thunk), (window as any).devToolsExtension && (window as any).devToolsExtension()));
    return createStore<AppState>(reducer, applyMiddleware(thunk));
}

function handleApiResponse<T>(reqStatus: number, reqData: string, state: AppState, fieldToUpdate: string) {
    if (reqStatus === 200) {
        let parsedData: T;
        try {
            parsedData = JSON.parse(reqData);
        } catch (e) {
            return merge({}, state, { [fieldToUpdate]: { reqInProgress: false, reqError: "Error parsing data" } });
        }
        return merge({}, state, { [fieldToUpdate]: { reqInProgress: false, data: parsedData, reqError: "" } });
    } else if (reqStatus === 403 || reqStatus === 401) {
        return merge({}, state, { [fieldToUpdate]: { reqInProgress: false, reqError: "You need to login again" }, logged: false });
    } else {
        return merge({}, state, { [fieldToUpdate]: { reqInProgress: false, reqError: "Error fetching data" } });
    }
}

export function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case "SET_LOGGED":
            return merge({}, state, { logged: action.logged });
        case "FORM_ERROR":
            return merge({}, state, { logError: action.error });
        case "LOGIN_REQUEST_SENT":
            return merge({}, state, { loginInProgress: true });
        case "LOGIN_REQUEST_RECEIVED":
            try {
                let parsedData = JSON.parse(action.reqData);
                AppStorage.setItem(USERNAME_KEY, parsedData.name);
                return merge({}, state, { username: parsedData.name, loginInProgress: false });
            } catch (e) {
                return merge({}, state, { loginInProgress: false });
            }
        case "MARKS_REQUEST_SENT":
            return merge({}, state, { marks: { reqInProgress: true } });
        case "MARKS_REQUEST_RECEIVED":
            return handleApiResponse<Array<Subject>>(action.reqStatus, action.reqData, state, "marks");
        case "LOGOUT":
            AppStorage.setItem(LOGGED_KEY, "false");
            AppStorage.removeItem(USERNAME_KEY);
            return merge({}, state, { initialState });
        case "REMEMBER_LOGIN":
            return merge({}, state, { logged: action.logged });
        case "COMMUNICATIONS_REQUEST_SENT":
            return merge({}, state, { communications: { reqInProgress: true } });
        case "COMMUNICATIONS_REQUEST_RECEIVED":
            return handleApiResponse<Array<Communication>>(action.reqStatus, action.reqData, state, "communications");
        case "COMMUNICATION_REQUEST_RECEIVED":
            {
                let { reqData, commID, reqStatus } = action as COMMUNICATION_REQUEST_RECEIVED;
                if (reqStatus === 200) {
                    let parsedData: Communication;
                    let d: any = {};
                    try {
                        parsedData = JSON.parse(reqData);
                        d[commID] = parsedData;
                    } catch (e) {
                    }
                    return merge({}, state, { communications: { descriptions: d } });
                } else if (reqStatus === 403 || reqStatus === 401) {
                    return merge({}, state, {});
                    // return merge({}, state, { communications: {reqInProgress: false, reqError: "You need to login again"}, logged: false});
                } else {
                    return merge({}, state, {});
                    // TODO: implement failure
                    // return merge({}, state, { communications: {reqInProgress: false, reqError: "Error fetching data"}});
                }
            }
        case "COMMUNICATION_REQUEST_SENT":
            // TODO: implement spinner
            return state;
        case "FILES_REQUEST_SENT":
            return merge({}, state, { files: { reqInProgress: true } });
        case "FILES_REQUEST_RECEIVED":
            return handleApiResponse<Array<FileTeacher>>(action.reqStatus, action.reqData, state, "files");
        case "ABSENCES_REQUEST_SENT":
            return merge({}, state, { absences: { reqInProgress: true } });
        case "ABSENCES_REQUEST_RECEIVED":
            return handleApiResponse<Absences>(action.reqStatus, action.reqData, state, "absences");
        case "SUBJECT_TEACHERS_REQUEST_SENT":
            return { ...state, subjectTeachers: { reqInProgress: true, data: null, reqError: "" } }
        case "SUBJECT_TEACHERS_REQUEST_RECEIVED":
            return handleApiResponse<SubjectTeacher>(action.reqStatus, action.reqData, state, "subjectTeachers");
        case "LESSONS_REQUEST_SENT":
            {
                let newState = { ...state };
                newState.lessons[action.subjectId] = {
                    reqInProgress: true,
                    data: null,
                    reqError: ""
                };
                return merge({}, state, newState);
            }
        case "LESSONS_REQUEST_RECEIVED":
            {
                let newState = { ...state };
                const { reqData, reqStatus, subjectId } = action;
                if (reqStatus === 200) {
                    try {
                        const parsed: Array<Lesson> = JSON.parse(reqData)
                        newState.lessons[subjectId] = {
                            reqInProgress: false,
                            data: parsed,
                            reqError: ""
                        }
                    } catch (e) {
                        newState.lessons[subjectId] = {
                            reqInProgress: false,
                            data: null,
                            reqError: "Error parsing data"
                        }
                    }
                } else if (reqStatus === 403 || reqStatus === 401) {
                    newState.lessons[subjectId] = {
                        reqInProgress: false,
                        data: null,
                        reqError: "You need to login again"
                    }
                } else {
                    newState.lessons[subjectId] = {
                        reqInProgress: false,
                        data: null,
                        reqError: "Error fetching data"
                    }
                }
                return merge({}, state, newState);
            }
        default:
            return state;
    }
};
