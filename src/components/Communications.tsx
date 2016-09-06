import * as React from "react";
import { connect } from "react-redux";

import { Card, CardTitle, Spinner, DataTable, TableHeader } from "react-mdl";
import { AppState, Communication } from "../types";
import { get_communications } from "../actions";

interface Props {
    data: Array<Communication>;
    onLoad: () => void;
    reqInProgress: boolean;
    reqError: string;
}

class Component extends React.Component<Props, {}> {
    render() {
        return (
            <div id="communications" shadow={2}>
                <h3>Comunicazioni</h3>

                { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                { this.props.reqInProgress ? <Spinner /> : null }
                { this.props.data ? (
                    <DataTable
                        id = "ildiocano"
                        shadow={2}
                        rows={this.props.data}
                    >
                        <TableHeader name="title">Title</TableHeader>
                    </DataTable>) : null}
            </div>
        );
    }
    componentDidMount() {
        // Don't download if we already have the data
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(get_communications());
        }
    };
}

function mapStateToProps(state: AppState) {
    return {
        reqInProgress: state.communications.reqInProgress,
        data: state.communications.data,
        reqError: state.communications.reqError
    };
}

export const Communications = connect(mapStateToProps, mapDispatchToProps)(Component);
