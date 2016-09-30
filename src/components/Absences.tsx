import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import * as types from "../types";

import { get_absences } from "../actions";
import { Spinner } from "react-mdl";

interface Props {
    onLoad: () => void;
    data: types.AllAbsences;
    reqInProgress: boolean;
    reqError: string;
};


class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>Assenze</h3>
            {this.props.reqError ? <p>{this.props.reqError}</p> : null}
            {this.props.reqInProgress ? <Spinner /> : null}
            {this.props.data ? (
                <p>Assenze</p>
            ) : null}
        </div>);
    }
    componentDidMount() {
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
};

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(get_absences());
        }
    };
}

function mapStateToProps(state: AppState): any {
    return {
        reqInProgress: state.absences.reqInProgress,
        data: state.absences.data,
        reqError: state.absences.reqError
    };
};

export const Absences = connect(mapStateToProps, mapDispatchToProps)(Component);
