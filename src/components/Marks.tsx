import * as React from "react";

import * as types from "../types";
import { connect } from "react-redux";
import { get_marks } from "../actions";
import { Spinner, Card, CardTitle, CardText } from "react-mdl";
import { Subject } from './Subject';

interface Props {
    onLoad: any;
    reqInProgress: boolean;
    data?: Array<types.Subject>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        return(
            <Card shadow={2}>
                <CardTitle>Marks</CardTitle>
                <CardText>
                    { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                    { this.props.reqInProgress ? <Spinner /> : null }
                    <table className="striped responsive-table">
                        <tbody>
                            { this.props.data ? this.props.data.map(subj => {
                                return (<Subject key={subj.name} data={subj}></Subject>);
                            }) : null }
                        </tbody>
                    </table>    
                </CardText>
            </Card>
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
