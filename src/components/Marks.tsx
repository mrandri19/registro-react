import * as React from "react";

import { AppState, Subject } from '../types';
import { connect } from "react-redux";
import { get_marks } from '../actions';
import { Spinner } from './Spinner';

interface Props {
    onLoad: any;
    reqInProgress: boolean;
    data: Array<Subject>;
    reqError: string;
};

class Component extends React.Component<Props, {}> {
    render() {
        let marks: Array<Subject> = null;
        let nodes: any = null;
        if(this.props.data) {
            marks = this.props.data;
            nodes = marks.map(item => {
                console.log(item.name);
                return(<p>{item.name}</p>);
            });
        }
        return(
            <div>
                <h3>Your marks</h3>
                { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                { this.props.reqInProgress ? <Spinner /> : null }
                { nodes }
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

function mapStateToProps(state: AppState): any {
    // Every time the state is updated the props are recalculated
    return {
        reqInProgress: state.marks.reqInProgress,
        data: state.marks.data,
        reqError: state.marks.reqError
    };
};

export const Marks = connect(mapStateToProps, mapDispatchToProps)(Component);
