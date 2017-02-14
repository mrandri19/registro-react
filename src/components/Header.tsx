import * as React from "react";
import { Link } from "react-router";
import { Header as Mdl_header, Navigation } from "react-mdl";

export function Header() {
    return (
        <Mdl_header title="Registro Elettronico" scroll>
            <Navigation className="mdl-layout--large-screen-only">
                <Link to="/">
                    <i className="material-icons icon-margin">home</i>
                    Home
            </Link>
                <Link to="/marks">
                    <i className="material-icons icon-margin">assessment</i>
                    Voti
            </Link>
                <Link to="/absences">
                    <i className="material-icons icon-margin">date_range</i>
                    Assenze
            </Link>
                <Link to="/logout">
                    <i className="material-icons icon-margin">exit_to_app</i>
                    Esci
            </Link>
            </Navigation>
        </Mdl_header>);
}

