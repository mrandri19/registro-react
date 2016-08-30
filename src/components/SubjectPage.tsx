import * as React from "react";
import { Subject } from "./Subject";

import * as types from "../types";

import { connect } from "react-redux";

interface Props {
    data: Array<types.Subject>;
    params?: any;
}

export function Component(props: Props) {
    // HELP ME
    let subject = props.data.filter(subj => subj.name.replace(/\s+/g, "") === props.params.subject)[0];
    return (
        <div>
            <p>{props.params.subject}</p>
            <Subject data={subject}/>
        </div>
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
