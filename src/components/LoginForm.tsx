'use strict';
import * as React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { submit_form } from '../actions';
import { AppState, SUBMIT_FORM } from '../types';

interface Props {
    handleSubmit: (e: Event) => any,
    logged: boolean,
    router: any
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

           <p>{this.props.logged ? this.props.router.push('/'): null}</p>
        </form>);
    }
    
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: function(e: Event) {
            e.preventDefault();
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            dispatch(submit_form(username, password));
            // TODO: implement form validation
            //this.props.router.push('/');
        }
    }
}

function mapStateToProps(state:AppState) {
    return {
        logged: state.logged
    };
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));