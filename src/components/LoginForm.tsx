import * as React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { submit_form } from '../actions';
import { AppState } from '../types';

interface Props {
    handleSubmit: (e: Event) => any;
    logged: boolean;
    router: any;
    logError: string;
}

class Component extends React.Component<Props, {}> {
    componentWillUpdate(nextProps: Props, nextState: Object) {
        if(nextProps.logged) {
            this.props.router.push('/');
        }
    }
    render() {
        return (
        <form onSubmit={this.props.handleSubmit.bind(this)}>
            <p>{this.props.logError}</p>

            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Username" type="text"/>

            <label htmlFor="password">Password</label>
            <input id="password" type="password"/>

            <input className="btn waves-effect waves-light" type="submit" value="Login"/>
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
        }
    };
}

function mapStateToProps(state: AppState) {
    return {
        logged: state.logged,
        logError: state.logError
    };
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
