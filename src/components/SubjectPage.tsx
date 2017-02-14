import * as React from "react";
import { connect } from "react-redux";
import { Spinner } from "react-mdl";

import { BasicRoute } from "./BasicRouteHOC";

import { Subject } from "./Subject";
import * as types from "../types";
import { upcase_first } from "../utils/upcase_first";
import { get_marks } from "../actions";


interface Props extends types.OnLogoutRedirectComponent {
    data: Array<types.Subject>;
    params: any;
    reqInProgress: boolean;
    onLoad: () => void;
}

class Component extends React.Component<Props, {}> {
    render() {
        let subject: types.Subject | null;
        if (this.props.data) {
            subject = this.props.data.filter(subj => subj.name.replace(/\s+/g, "") === this.props.params.subject)[0];
        } else {
            subject = null;
        }
        return (
            <div className="subjectPage">
                <h3>{subject ? upcase_first(subject.name) : null}</h3>
                {this.props.reqInProgress ? <Spinner /> : null}
                {subject ? <Subject data={subject} /> : null}
            </div>
        );
    }
    componentDidMount() {
        // Don't download if we already have the data
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(get_marks());
        }
    };
}

function mapStateToProps(state: types.AppState) {
    return {
        reqInProgress: state.marks.reqInProgress,
        data: state.marks.data,
        logged: state.logged
    };
}

export const SubjectPage = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
