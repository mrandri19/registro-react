import * as React from "react";

import * as types from "../types";
import { connect } from "react-redux";
import { get_marks } from "../actions";
import { Spinner, Grid, Cell } from "react-mdl";

import { SubjectCard } from "./SubjectCard";
import { calc_marks_mean } from "../utils/calc_marks_mean";
import * as config from "../config";

interface Props {
    onLoad: () => void;
    reqInProgress: boolean;
    data?: Array<types.Subject>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        return (
            <div className="subjects">
                <h3 style={{ marginLeft: "1em" }}>Voti</h3>
                {this.props.reqError ? <div className="appPadding"><p>{this.props.reqError}</p></div> : null}
                {this.props.reqInProgress ? <div className="appPadding"><Spinner /></div> : null}
                <Grid>
                    {this.props.data ? this.props.data.map(sub => {

                        let mean: number;
                        let year = (new Date()).getFullYear();
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
        reqError: state.marks.reqError
    };
};

export const Marks = connect(mapStateToProps, mapDispatchToProps)(Component);
