import * as React from "react";
import { Card, CardTitle } from "react-mdl";

import { LoginForm } from "./LoginForm";

export function Login(props: any) {
    return (
    <Card id="login" shadow={3}>
        <CardTitle>
            Please login
        </CardTitle>
        <LoginForm />
    </Card>);
}
