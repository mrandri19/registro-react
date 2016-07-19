import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { merge } from "lodash";

import { Hello } from './components/Hello';
import { Input } from './components/Input';
import { AppState, AppActions, SUBMIT_FORM, DAW } from './types';

const initialState: AppState = {
    username: 'Andrea',
    logged: false
}

function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case 'SUBMIT_FORM':
            const { username, password } = action as SUBMIT_FORM;
            console.log('username:', username, 'password:', password);
            
            return merge({}, state, {logged: true});

        case 'DAW':
            console.log((action as DAW).name);
            return state;

        default:
            return state;
    }
};

const store = createStore(reducer);

function Navbar() {
    return (<nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="marks">Marks</Link></li>
            </ul>
        </nav>);
}

function Footer() {
    return (<footer>
        Built with ♥ by <a href="#">Andrea Cognolato</a> and <a href="#">Daniele Monteleone</a>
    </footer>);
}

function App(props: any) {
    return (<div>
        <h1>App</h1>
        <Navbar />
        {props.children}
        <Footer />
    </div>);
}

function Login(props:any) {
    return (<div>
        <h1>Please login</h1>
        <Input />
    </div>);
}

function Marks(props:any) {
    return (<h3>Your marks</h3>);
}

function checkAuth(nextState: any, replace: any) {
    console.log(nextState);
    replace({
        pathname: '/login',
    })
    return;
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Hello} onEnter={checkAuth}/>
                <Route path="marks" component={Marks} onEnter={checkAuth}></Route>
                <Route path="login" component={Login}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("example")
);