import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Spinner, CardText, Textfield } from "react-mdl";

import { submit_form } from "../actions";
import { AppState } from "../types";

interface Props {
    handleSubmit: (e: Event) => any;
    logged: boolean;
    router: any;
    logError: string;
    loginInProgress: boolean;
}

class Component extends React.Component<Props, {}> {
    componentWillUpdate(nextProps: Props, nextState: Object) {
        if (nextProps.logged) {
            this.props.router.push("/");
        }
    }
    render() {
        return (
            <CardText>
                {this.props.loginInProgress ? <Spinner /> : null}
                <form action="#" onSubmit={this.props.handleSubmit.bind(this)}>
                    <p>Username e password sono gli stessi di Spaggiari, non e' necessario registrarsi.</p>
                    <p className="loginFormErrors" >{this.props.logError}</p>

                    <Textfield
                        floatingLabel
                        required={true}
                        label="Username"
                        type="text"
                        id="username"
                        />

                    <Textfield
                        floatingLabel
                        required={true}
                        label="Password"
                        type="password"
                        id="password"
                        />
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
                        type="submit"
                        value="Login">
                        Log in
                </button>
                </form>
            </CardText>);
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: function (e: Event) {
            e.preventDefault();
            const username = (document.getElementById("username") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;

            dispatch(submit_form(username, password));
        }
    };
}

function mapStateToProps(state: AppState) {
    return {
        logged: state.logged,
        logError: state.logError,
        loginInProgress: state.loginInProgress
    };
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
