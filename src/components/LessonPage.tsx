import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Spinner, List, ListItem } from "react-mdl";

import * as types from "../types";
import { BasicRoute } from "./BasicRouteHOC";
import { get_subjectTeachers } from "../actions";
import { upcase_first_in_sentence } from "../utils/upcase_first_in_sentence";


interface Props extends types.OnLogoutRedirectComponent {
    onLoad: () => void;
    reqInProgress: boolean;
    data?: Array<types.SubjectTeacher>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        return (
            <div className="appPadding">
                <h3>Argomenti svolti a lezione</h3>
                {this.props.reqError ? <div className="appPadding"><p>{this.props.reqError}</p></div> : null}
                {this.props.reqInProgress ? <div className="appPadding"><Spinner /></div> : null}
                <List>
                    {this.props.data ? (
                        this.props.data.map(subjectTeacher => {

                            return (
                                <ListItem key={subjectTeacher.name}>
                                    <Link to={`/subjectLessons/${subjectTeacher.code}`}>
                                        {upcase_first_in_sentence(subjectTeacher.name)}
                                    </Link>
                                </ListItem>
                            );
                        }
                        )
                    ) : null}
                </List>
            </div>
        );
    }
    componentDidMount() {
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
}

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {
        onLoad: () => {
            dispatch(get_subjectTeachers());
        }
    };
}

function mapStateToProps(state: types.AppState): any {
    // Every time the state is updated the props are recalculated
    return {
        reqInProgress: state.subjectTeachers.reqInProgress,
        data: state.subjectTeachers.data,
        reqError: state.subjectTeachers.reqError,
        logged: state.logged
    };
};

export const LessonPage = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
