export type AppState = {
    username: string,
    logged: boolean
}

export interface SUBMIT_FORM {
    type: "SUBMIT_FORM",
    username: string,
    password: string
}

export interface DAW {
    type: "DAW"
    name: number;
}

export type AppActions = SUBMIT_FORM | DAW;