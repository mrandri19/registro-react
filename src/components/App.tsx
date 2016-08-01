import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../types";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface Props {
    children: any;
}

const component = function(props: Props) {
    return (
        <div className="wrapper">
            <Navbar />
            <main>
                <div className="container">
                    { props.children }
                </div>
            </main>
            <Footer />
        </div>);
};

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: AppState) {
    return {};
}

export const App = connect(mapStateToProps, mapDispatchToProps)(component);
