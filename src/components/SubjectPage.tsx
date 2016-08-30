import * as React from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardText } from "react-mdl";


import { Subject } from "./Subject";
import * as types from "../types";
import { upcase_first } from "../utils/upcase_first";


interface Props {
    data: Array<types.Subject>;
    params?: any;
}

export function Component(props: Props) {
    // HELP ME
    let subject: types.Subject;
    if (props.data) {
        subject = props.data.filter(subj => subj.name.replace(/\s+/g, "") === props.params.subject)[0];
    } else {
        subject = null;
    }
    return (
        <Card className="subjectPage" shadow={2}>
            <CardTitle>
                {subject ? upcase_first(subject.name) : null}
            </CardTitle>
            <CardText>
                {subject ? <Subject data={subject}/> : null}
            </CardText>
        </Card>
    );
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: types.AppState) {
    return {
        data: state.marks.data
    };
}

export const SubjectPage = connect(mapStateToProps, mapDispatchToProps)(Component);
