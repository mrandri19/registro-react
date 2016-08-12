import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Layout, Drawer, Navigation, Content } from "react-mdl";

import { AppState } from "../types";

import { Navbar } from "./Navbar";
import { MyFooter } from "./Footer";

interface Props {
    children: any;
}

const component = function(props: Props) {
    return (
        <Layout fixedHeader>
            <Navbar />
            <Drawer title="Registro Elettronico">
                <Navigation>
                    <Link to="/">Home</Link>
                    <Link to="marks">Marks</Link>
                    <Link to="logout">Logout</Link>
                </Navigation>
            </Drawer>
            <Content>
                {props.children}
            </Content>
            <MyFooter />
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
