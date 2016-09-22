import * as config from "./config";

export function login(username: string, password: string, key: ArrayBufferView, onfinish: (status: number) => void ) {
    const req = new XMLHttpRequest();
    const url = config.api_url + "/login";
    const params = `login=${username}&password=${password}&key=${key}`;

    req.open("POST", url, true);
    req.withCredentials = true;
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status);
        }
    };
    req.send(params);
}

export function marks(onfinish: (status: number, response: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + "/marks";

    req.open("GET", url, true);
    req.withCredentials = true;

    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };

    req.send();
}

export function communications(onfinish: (status: number, response: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + "/communications";

    req.open("GET", url, true);
    req.withCredentials = true;

    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };

    req.send();
}

export function communication(commID: string, onfinish: (status: number, response: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + `/communication/${commID}/desc`;

    req.open("GET", url, true);
    req.withCredentials = true;

    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };

    req.send();
}

export function files(onfinish: (status: number, response: string) => void) {
    const req = new XMLHttpRequest();
    const url = config.api_url + `/files`;

    req.open("GET", url, true);
    req.withCredentials = true;

    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onfinish(req.status, req.response);
        }
    };

    req.send();
}