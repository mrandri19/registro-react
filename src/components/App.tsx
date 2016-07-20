import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

import { AppState } from '../types';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface Props {
    children: any,
    logged: boolean
}

const component = function(props: Props) {
    return (<div>
        <h1>App</h1>
        <Navbar />
        <p>Logged: { props.logged ? 'true' : 'false' }</p>

        {props.children}
        <Footer />
    </div>);
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: AppState) {
    return {
        logged: state.logged
    };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(component);