import * as React from "react";
import { AppState } from '../types';
import { connect } from 'react-redux';

interface Props {

}

const component = function(props: Props) {
    return (<form className="pure-form" action="">
        <label htmlFor="username">Username</label>
       <input id="username" type="text"/>
    </form>);
}

function mapDispatchToProps(dipatch:any) {
    return {};
}

function mapStateToProps(state:AppState) {
    return {};
}

export const Input = connect(mapStateToProps, mapDispatchToProps)(component);