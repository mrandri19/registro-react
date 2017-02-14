import { connect } from "react-redux";
import * as React from "react";
import { BasicRoute } from "./BasicRouteHOC";
import * as types from "../types";
import { get_lesson } from "../actions";
import { Spinner, DataTable, TableHeader } from "react-mdl";
import { display_date } from "../utils/display_date";

import * as _ from "lodash";

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: (subjectId: string, teacherCodes: number[]) => void;
    lessons: { [key: string]: types.ApiCall<Array<types.Lesson>> }
    params: { id: string };
    subjectTeachers: types.SubjectTeacher[] | null;
};

class Component extends React.Component<Props, {}> {
    render() {
        const {subjectTeachers, params, lessons} = this.props;
        const name = subjectTeachers ? subjectTeachers
            .filter(s => s.code == params.id)
            .map(s => s.name) : null;

        const data = lessons[params.id] || {}
        return (
            <div className="appPadding">
                <h3>{name}</h3>
                {data.reqError ? <p>{data.reqError}</p> : null}
                {data.reqInProgress ? <Spinner /> : null}
                {data.data ? (
                    <DataTable
                        className="dottedTable"
                        shadow={0}
                        rows={data.data.map(l => {
                            return {
                                ...l,
                                date: display_date(l.date)
                            };
                        })}>
                        <TableHeader name="content">Contenuto</TableHeader>
                        <TableHeader numeric name="date">Data</TableHeader>
                    </DataTable>
                ) : null}
            </div>
        )
    }
    componentDidMount() {
        if (!_.isEmpty(this.props.lessons[this.props.params.id])) {
            return;
        }
        if (this.props.subjectTeachers) {
            const teacherCodes = this.props.subjectTeachers
                .filter(s => s.code == this.props.params.id)
                .map(s => s.teacherCodes)[0]
            this.props.onLoad(this.props.params.id, teacherCodes);
        } else { console.log("No subjectTeachers loaded") }
    }
}

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {
        onLoad: (subjectId: string, teacherCodes: number[]) => {
            dispatch(get_lesson(subjectId, teacherCodes));
        }
    };
}

function mapStateToProps(state: types.AppState): any {
    // Every time the state is updated the props are recalculated
    return {
        lessons: state.lessons,
        logged: state.logged,
        subjectTeachers: state.subjectTeachers.data,
    };
};

export const Lessons = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));