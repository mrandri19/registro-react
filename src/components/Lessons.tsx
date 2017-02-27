import * as React from "react";
import { connect } from "react-redux";
import { Spinner, List, ListItem, ListItemContent, ListItemAction } from "react-mdl";

import * as _ from "lodash";

import { BasicRoute } from "./BasicRouteHOC";
import * as types from "../types";
import { get_lesson } from "../actions";
import { upcase_first_in_sentence } from "../utils/upcase_first_in_sentence";
import { display_date } from "../utils/display_date";

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: (subjectId: string, teacherCodes: number[]) => void;
    lessons: { [key: string]: types.ApiCall<Array<types.Lesson>> };
    params: { id: string };
    subjectTeachers: types.SubjectTeacher[] | null;
};

class Component extends React.Component<Props, {}> {
    render() {
        const {subjectTeachers, params, lessons} = this.props;
        const name = subjectTeachers ? subjectTeachers
            .filter(s => s.code === params.id)
            .map(s => s.name) : null;

        const data = lessons[params.id] || null;
        if (name && data) {
            return (
                <div className="appPadding">
                    <h3>{upcase_first_in_sentence(name[0])}</h3>
                    {data.reqError ? <p>{data.reqError}</p> : null}
                    {data.reqInProgress ? <Spinner /> : null}
                    {data.data ? (
                        <List>
                            {data.data.map(lesson =>
                                <ListItem key={lesson.date} twoLine>
                                    <ListItemContent subtitle={lesson.teacher}>
                                        {lesson.content}
                                    </ListItemContent>
                                    <ListItemAction>
                                        <span>
                                            {display_date(lesson.date)}
                                        </span>
                                    </ListItemAction>
                                </ListItem>
                            )}
                        </List>
                    ) : null}
                </div>
            );
        }
        return null;
    }
    componentDidMount() {
        if (!_.isEmpty(this.props.lessons[this.props.params.id])) {
            return;
        }
        if (this.props.subjectTeachers) {
            const teacherCodes = this.props.subjectTeachers
                .filter(s => s.code === this.props.params.id)
                .map(s => s.teacherCodes)[0];
            this.props.onLoad(this.props.params.id, teacherCodes);
        } else { this.props.router.push("/lessons"); }
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
