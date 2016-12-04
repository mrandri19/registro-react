import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { Card, CardTitle, CardText, Grid, Cell } from "react-mdl";

import { BasicRoute } from "./BasicRouteHOC";

import * as types from "../types";
import { get_absences } from "../actions";
import { Spinner } from "react-mdl";

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: () => void;
    data: types.AllAbsences;
    reqInProgress: boolean;
    reqError: string;
};

function Absence(props: { data: types.Absence }) {
    return (
        <Cell col={3} phone={12} tablet={4}>
            <Card className="cardPadding" shadow={3}>
                <CardTitle>Assenza</CardTitle>
                <CardText>
                    <p>{"Numero: " + props.data.id}</p>
                    <p>{"Giorni: " + props.data.days}</p>
                    <p>{"Dal: " + props.data.from}</p>
                    <p>{"Al: " + props.data.to}</p>
                    <p>{props.data.justification}</p>
                </CardText>
            </Card>
        </Cell>
    );
}

function Delay(props: { data: types.Delay }) {
    return (
        <Cell col={3} phone={12} tablet={4}>
            <Card className="cardPadding" shadow={3}>
                <CardTitle>Ritardo</CardTitle>
                <CardText>
                    <p>{"Numero: " + props.data.id}</p>
                    <p>{"Giorno: " + props.data.day}</p>
                    <p>{"Ore: " + props.data.hours}</p>
                    <p>{props.data.justification}</p>
                </CardText>
            </Card>
        </Cell>
    );
}

function Exit(props: { data: types.Exit }) {
    return (
        <Cell col={3} phone={12} tablet={4}>
            <Card className="cardPadding" shadow={3}>
                <CardTitle>Uscita</CardTitle>
                <CardText>
                    <p>WIP</p>
                </CardText>
            </Card>
        </Cell>
    );
}

class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>Assenze</h3>
            {this.props.reqError ? <p>{this.props.reqError}</p> : null}
            {this.props.reqInProgress ? <Spinner /> : null}
            {this.props.data ? (
                <div>
                    <h4>Giustificate</h4>
                    <Grid>
                        {this.props.data.done.absences ? this.props.data.done.absences.map(
                            (absence) => <Absence data={absence} />
                        ) : null}
                        {this.props.data.done.delays ? this.props.data.done.delays.map(
                            (delay) => <Delay data={delay} />
                        ) : null}
                        {this.props.data.done.exits ? this.props.data.done.exits.map(
                            (exit) => <Exit data={exit} />
                        ) : null}
                    </Grid>
                    <h4>Non giustificate</h4>
                    <Grid>
                        {this.props.data.undone ?
                            (this.props.data.undone.absences ?
                                this.props.data.undone.absences.map(
                                    (absence) => <Absence data={absence} />
                                ) : null
                            ) : null}
                        {this.props.data.undone ?
                            (this.props.data.undone.delays ?
                                this.props.data.undone.delays.map(
                                    (delay) => <Delay data={delay} />
                                ) : null
                            ) : null}
                        {this.props.data.undone ?
                            (this.props.data.undone.exits ?
                                this.props.data.undone.exits.map(
                                    (exit) => <Exit data={exit} />
                                ) : null
                            ) : null}
                    </Grid>
                </div>
            ) : null}
        </div>);
    }
    componentDidMount() {
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
};

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(get_absences());
        }
    };
}

function mapStateToProps(state: AppState): any {
    return {
        reqInProgress: state.absences.reqInProgress,
        data: state.absences.data,
        reqError: state.absences.reqError,
        logged: state.logged
    };
};

export const Absences = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
