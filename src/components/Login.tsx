import * as React from "react";
import { Card, CardTitle } from "react-mdl";

import { LoginForm } from "./LoginForm";

export function Login(props: any) {
    return (
    <Card id="login" shadow={3}>
        <CardTitle style={{color: "#fff", backgroundColor: "#3f51b5"}}>
            Please login
        </CardTitle>
        <LoginForm />
    </Card>);
}
