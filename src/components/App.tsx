import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Layout, Drawer, Navigation, Content } from "react-mdl";

import { AppState } from "../types";

import { Navbar } from "./Navbar";

interface Props {
    children: any;
}

const component = function (props: Props) {
    return (
        <Layout fixedHeader>
            <Navbar />
            <Drawer title="Registro Elettronico">
                <Navigation>
                    <Link to="/">
                        <i className="material-icons icon-margin">home</i>
                        Home
                    </Link>
                    <Link to="/marks">
                        <i className="material-icons icon-margin">assessment</i>
                        Voti
                    </Link>
                    <Link to="/files">
                        <i className="material-icons icon-margin">insert_drive_file</i>
                        Files
                    </Link>
                    <Link to="/communications">
                        <i className="material-icons icon-margin">assignment</i>
                        Comunicazioni
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
            </Drawer>
            <Content>
                {props.children}
            </Content>
        </Layout>
    );
};

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: AppState) {
    return {};
}

export const App = connect(mapStateToProps, mapDispatchToProps)(component);
