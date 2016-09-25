import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { upcase_first } from "../utils/upcase_first";

interface Props {
    username: string | null;
};

const component = function(props: Props) {
    return (<div className="appPadding">
        <h3>{`Benvenuto ${props.username ? props.username.toLocaleLowerCase().split(" ").map(upcase_first).join(" ") : "null"}`}</h3>
        <p>La app e' ancora in fase beta.</p>
        <p>Segnalaci i bug all'indirizzo: <a href="mailto:bugreport@registro.ml">bugreport@registro.ml</a></p>
    </div>);
};

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {};
}

function mapStateToProps(state: AppState): Props {
    // Every time the state is updated the props are recalculated
    return { username: state.username };
};

export const Hello = connect(mapStateToProps, mapDispatchToProps)(component);
