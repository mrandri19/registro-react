import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { Hello } from './components/Hello';
import { Input } from './components/Input';
import { AppState } from './types';

const initialState: AppState = {
    username: 'Andrea'
}

function reducer(state = initialState, action: any) {
    return state;
};

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Hello />
            <Input />
        </div>
    </Provider>,
    document.getElementById("example")
);