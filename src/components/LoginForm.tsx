'use strict';
import * as React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AppState, SUBMIT_FORM } from '../types';

interface Props {
    handleSubmit: (e: Event) => any
}

class Component extends React.Component<Props, {}> {
    render() {
        return (
        <form onSubmit={this.props.handleSubmit.bind(this)}>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Username" type="text"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password"/>
            <input type="submit" value="Login"/>
        </form>);
    }
    
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: function(e: Event) {
            e.preventDefault();
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            if (username === "andrea" && password === "daw") {
                console.log('User logged');

                const action: SUBMIT_FORM = {type: 'SUBMIT_FORM', username: username, password: password}
                dispatch(action);
                console.log(this.props.router.push('/'));
            }
        }
    }
}

function mapStateToProps(state:AppState) {
    return {};
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));