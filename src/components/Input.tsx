'use strict';
import * as React from "react";
import { AppState, SUBMIT_FORM } from '../types';
import { connect } from 'react-redux';

interface Props {
    handleSubmit: (e: Event) => any
}

const component = function(props: Props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Username" type="text"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password"/>
            <input type="submit" value="Login"/>
        </form>);
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: (e: Event) => {
            e.preventDefault();
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const action: SUBMIT_FORM = {type: 'SUBMIT_FORM', username: username, password: password}

            dispatch(action);
        }
    }
}

function mapStateToProps(state:AppState) {
    return {};
}

export const Input = connect(mapStateToProps, mapDispatchToProps)(component);