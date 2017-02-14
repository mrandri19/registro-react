import * as config from "./config";

function GET(apiEndpoint: string, onfinish: (status: number, response: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + apiEndpoint;

    req.open("GET", url, true);
    req.withCredentials = true;

    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };

    req.send();
}

export function login(username: string, password: string, key: ArrayBufferView, onfinish: (status: number, username: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + "/login";
    const params = `login=${username}&password=${password}&key=${key}`;

    req.open("POST", url, true);
    req.withCredentials = true;
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };
    req.send(params);
}

export function communication(commID: string, onfinish: (status: number, response: string) => void) {
    GET(`/communication/${commID}/desc`, onfinish);
}

export function marks(onfinish: (status: number, response: string) => void) {
    GET("/marks", onfinish);
}

export function communications(onfinish: (status: number, response: string) => void) {
    GET("/communications", onfinish);
}

export function files(onfinish: (status: number, response: string) => void) {
    GET("/files", onfinish);
}

export function absences(onfinish: (status: number, response: string) => void) {
    GET("/absences", onfinish);
}

export function subjectTeachers(onfinish: (status: number, response: string) => void) {
    GET("/subjects", onfinish);
}

export function lesson(subjectId: string, teacherCodes: number[], onfinish: (status: number, response: string) => void) {
    GET(`/subject/${subjectId}/lessons?teacherCode=${teacherCodes.join(',')}`, onfinish);
}
