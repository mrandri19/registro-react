import * as React from "react";
import { AppState } from '../types';
import { connect } from "react-redux";

interface Props {
    name: string
};

const component = function(props: Props) {
    return <h3>{'Hello, please login'}</h3>;
}

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {};
}

function mapStateToProps(state: AppState): Props {
    // Every time the state is updated the props are recalculated
    return {name: state.username};
};

export const Hello = connect(mapStateToProps, mapDispatchToProps)(component);