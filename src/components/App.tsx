import * as React from "react";
import { Link } from "react-router";
import { Layout, Drawer, Navigation, Content } from "react-mdl";

import { Header } from "./Header";

interface Props {
    children: any;
}

const component = function (props: Props) {
    return (
        <Layout fixedDrawer>
            <Header />
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
                    <Link to="/lessons">
                        <i className="material-icons icon-margin">class</i>
                        Lezioni
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

export const App = component;
