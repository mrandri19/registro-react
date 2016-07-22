import * as React from "react";
import { AppState } from '../types';
import { connect } from "react-redux";
import { get_marks } from '../actions';

interface Props {
    onLoad: any;
};

class Component extends React.Component<Props, {}> {
    render() {
        return(<h3>Your marks</h3>);
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
    return {};
};

export const Marks = connect(mapStateToProps, mapDispatchToProps)(Component);
