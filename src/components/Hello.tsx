import * as React from "react";
import { AppState } from '../types';
import { connect } from "react-redux";

export interface HelloProps {
    todos: AppState
};

const component = function(props: HelloProps) {
    return <h1>{props.todos.username}</h1>;
}

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {};
}

function mapStateToProps(state: AppState): HelloProps {
    // Every time the state is updated the props are recalculated
    return {todos: state};
};

export const Hello = connect(mapStateToProps, mapDispatchToProps)(component);