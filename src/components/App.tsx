import * as React from "react";
import { connect } from "react-redux";
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
            <Drawer title="TitleDAW">
                <Navigation>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
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
