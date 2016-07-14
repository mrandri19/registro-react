import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { Hello, HelloProps } from './components/Hello';
import { AppState } from './types';

const initialState: AppState = {
    username: 'Andrea'
}

function reducer(state = initialState, action: any) {
    return state;
};

let store = createStore(reducer);

let MyInput = connect((state: AppState) => {
    return {};
}, (dispatch) => {
    return {
        changeHandler: (e: any) => console.log(e.target.value)
    };
})((props) => <input onBlur={props.changeHandler} type="text" />);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Hello />
            <MyInput />
        </div>
    </Provider>,
    document.getElementById("example")
);