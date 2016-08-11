import * as React from "react";
import { Link } from "react-router";
import { Header, Navigation } from "react-mdl";

export function Navbar() {
    return (<Header title="Registro Elettronico">
                <Navigation>
                    <Link to="/">Home</Link>
                    <Link to="marks">Marks</Link>
                    <Link to="logout">Logout</Link>
                </Navigation>
            </Header>);
}

