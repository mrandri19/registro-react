import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

type AppState = {
    username: string
}

type HelloProps = {
    todos: AppState
};

const initialState: AppState = {
    username: 'Andrea'
}

function reducer(state = initialState, action: any) {
    return state;
};

let store = createStore(reducer);

function Hello(props: HelloProps) {
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

let App = connect(mapStateToProps, mapDispatchToProps)(Hello);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("example")
);