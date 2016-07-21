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
    return (<div className="row">
        <div className="col s12">
            <header>
                <h1>App</h1>
                <Navbar />
            </header>
            { props.loginInProgress ? <Spinner /> : null }
            <p>Logged: { props.logged ? 'true' : 'false' }</p>
            {props.children}
            <Footer />
        </div>
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
