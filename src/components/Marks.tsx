import * as React from "react";
import { Spinner, Grid, Cell } from "react-mdl";
import { connect } from "react-redux";

import * as config from "../config";
import * as types from "../types";

import { BasicRoute } from "./BasicRouteHOC";
import { get_marks } from "../actions";
import { SubjectCard } from "./SubjectCard";
import { calc_marks_mean } from "../utils/calc_marks_mean";

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: () => void;
    reqInProgress: boolean;
    data?: Array<types.Subject>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        const year = (new Date()).getFullYear();
        return (
            <div className="subjects">
                <div className="appPadding">
                    <h3>Voti</h3>
                    {this.props.data ? <h4>{"Media: "}
                        {
                            (this.props.data
                                .map(sub => (year === config.school_start_year) ? calc_marks_mean(sub.marks.filter(sub => sub.q === "q1")) : calc_marks_mean(sub.marks.filter(sub => sub.q === "q3"))).reduce((a, b) => a + b) / this.props.data.length).toFixed(2)
                        }
                    </h4> : null
                    }
                    {this.props.reqError ? <div><p>{this.props.reqError}</p></div> : null}
                    {this.props.reqInProgress ? <div><Spinner /></div> : null}
                </div>
                <Grid>
                    {this.props.data ? this.props.data.map(sub => {

                        let mean: number;
                        if (year === config.school_start_year) {
                            mean = calc_marks_mean(sub.marks.filter(sub => sub.q === "q1"));
                        } else {
                            mean = calc_marks_mean(sub.marks.filter(sub => sub.q === "q3"));
                        }

                        return (
                            <Cell col={3} phone={12} tablet={4} key={sub.name}>
                                <SubjectCard
                                    name={sub.name}
                                    mean={mean}
                                />
                            </Cell>
                        );
                    }) : null}
                </Grid>
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
    // Every time the state is updated the props are recalculated
    return {
        onLoad: () => {
            dispatch(get_marks());
        }
    };
}

function mapStateToProps(state: types.AppState): any {
    // Every time the state is updated the props are recalculated
    return {
        reqInProgress: state.marks.reqInProgress,
        data: state.marks.data,
        reqError: state.marks.reqError,
        logged: state.logged
    };
};

export const Marks = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
