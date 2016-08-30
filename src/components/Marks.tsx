import * as React from "react";

import * as types from "../types";
import { connect } from "react-redux";
import { get_marks } from "../actions";
import { Spinner, Grid, Cell } from "react-mdl";

import { SubjectCard } from "./SubjectCard";
import { grade_to_float } from "../utils/grade_to_float";

interface Props {
    onLoad: any;
    reqInProgress: boolean;
    data?: Array<types.Subject>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        return(
            <div className="subjects">
                    { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                    { this.props.reqInProgress ? <Spinner /> : null }
                    <Grid>
                        { this.props.data ? this.props.data.map(sub => {
                            let mean = sub.marks
                                .map(mark => grade_to_float(mark.mark))
                                .filter(mark => mark !== undefined)
                                .reduce((acc, mark) => acc + mark, 0) / sub.marks.length;

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
        // TODO: cache marks
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
