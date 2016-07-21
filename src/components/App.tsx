import * as React from "react";
import { connect } from 'react-redux';

import { AppState } from '../types';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Spinner } from './Spinner';

interface Props {
    children: any;
    logged: boolean;
    loginInProgress: boolean;
}

const component = function(props: Props) {
    return (
        <div>
            <Navbar />
            <main className="container">
                { props.loginInProgress ? <Spinner /> : null }
                {props.children}
            </main>
            <Footer />
        </div>);
};

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: AppState) {
    return {
        logged: state.logged,
        loginInProgress: state.loginInProgress
    };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(component);
