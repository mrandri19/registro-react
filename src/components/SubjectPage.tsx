import * as React from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardText, Spinner } from "react-mdl";


import { Subject } from "./Subject";
import * as types from "../types";
import { upcase_first } from "../utils/upcase_first";
import { get_marks } from "../actions";


interface Props {
    data: Array<types.Subject>;
    params?: any;
    reqInProgress: boolean;
    onLoad: () => void;
}

class Component extends React.Component<Props, {}> {
    render() {
        // HELP ME
        let subject: types.Subject;
        if (this.props.data) {
            subject = this.props.data.filter(subj => subj.name.replace(/\s+/g, "") === this.props.params.subject)[0];
        } else {
            subject = null;
        }
        return (
            <Card className="subjectPage" shadow={2}>
                <CardTitle>
                    {subject ? upcase_first(subject.name) : null}
                </CardTitle>
                <CardText>
                    { this.props.reqInProgress ? <Spinner /> : null }
                    {subject ? <Subject data={subject}/> : null}
                </CardText>
            </Card>
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
        data: state.marks.data
    };
}

export const SubjectPage = connect(mapStateToProps, mapDispatchToProps)(Component);
