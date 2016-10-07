import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { Card, CardTitle, CardText, Grid, Cell } from "react-mdl";

import * as types from "../types";
import { get_absences } from "../actions";
import { Spinner } from "react-mdl";

interface Props {
    onLoad: () => void;
    data: types.AllAbsences;
    reqInProgress: boolean;
    reqError: string;
};

function Absence(params: {data: types.Absence}) {
    return (
        <Cell col={3} phone={12} tablet={4}>
            <Card className="cardPadding" shadow={3}>
                <CardTitle>Assenza</CardTitle>
                <CardText>
                    <p>{"Numero: " + params.data.id}</p>
                    <p>{"Giorni: " + params.data.days}</p>
                    <p>{"Dal: " + params.data.from}</p>
                    <p>{"Al: " + params.data.to}</p>
                    <p>{params.data.justification}</p>
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
        reqError: state.absences.reqError
    };
};

export const Absences = connect(mapStateToProps, mapDispatchToProps)(Component);
