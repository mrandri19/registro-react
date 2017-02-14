import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { Card, CardTitle, CardText, Grid, Cell } from "react-mdl";

import { BasicRoute } from "./BasicRouteHOC";

import * as types from "../types";
import { get_absences } from "../actions";
import { Spinner } from "react-mdl";

import { display_date } from "../utils/display_date"

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: () => void;
    data: types.Absences;
    reqInProgress: boolean;
    reqError: string;
};

function Absence(props: { data: types.Absence }) {
    return (
        <Cell col={3} phone={12} tablet={4}>
            <Card className="cardPadding" shadow={3}>
                <CardTitle style={{ backgroundColor: "#CE93D8" }}>Assenza</CardTitle>
                <CardText>
                    <p>{"Numero: " + props.data.id}</p>
                    <p>{"Giorni: " + props.data.days}</p>
                    <p>{"Dal: " + display_date(props.data.from)}</p>
                    <p>{"Al: " + display_date(props.data.to)}</p>
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
                <CardTitle style={{ backgroundColor: "#F48FB1" }}>Ritardo</CardTitle>
                <CardText>
                    <p>{"Numero: " + props.data.id}</p>
                    <p>{"Giorno: " + display_date(props.data.day)}</p>
                    <p>{"Ore: " + props.data.hour}</p>
                    <p>{props.data.justification}</p>
                </CardText>
            </Card>
        </Cell>
    );
}

/*function Exit(props: { data: types.Exit }) {
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
}*/

class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>Assenze</h3>
            {this.props.reqError ? <p>{this.props.reqError}</p> : null}
            {this.props.reqInProgress ? <Spinner /> : null}
            {this.props.data ? (
                <div>
                    <h4>Non giustificate</h4>
                    <Grid>
                        {this.props.data.absences ? this.props.data.absences.filter(a => !a.done).map(
                            (absence) => <Absence key={absence.id} data={absence} />
                        ) : null}
                        {this.props.data.delays ? this.props.data.delays.filter(a => !a.done).map(
                            (delay) => <Delay key={delay.id} data={delay} />
                        ) : null}

                    </Grid>
                    <h4>Giustificate</h4>
                    <Grid>
                        {this.props.data.absences ?
                            this.props.data.absences.filter(a => a.done).map(
                                (absence) => <Absence key={absence.id} data={absence} />
                            ) : null}
                        {this.props.data.delays ?
                            this.props.data.delays.filter(a => a.done).map(
                                (delay) => <Delay key={delay.id} data={delay} />
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
