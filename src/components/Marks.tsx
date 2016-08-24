import * as React from "react";

import * as types from "../types";
import { connect } from "react-redux";
import { get_marks } from "../actions";
import { Spinner, Card, CardTitle, CardText, DataTable, TableHeader } from "react-mdl";
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
            <Card shadow={2} id="marks">
                <CardTitle>Marks</CardTitle>
                <CardText>
                    { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                    { this.props.reqInProgress ? <Spinner /> : null }
                    <Card shadow={2} className="marks">
                        <CardTitle>Matematica <span style={{"float": "right"}}>Media: 9.00</span></CardTitle>
                    </Card>
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
