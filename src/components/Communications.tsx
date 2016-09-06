import * as React from "react";
import { connect } from "react-redux";

import { Spinner, DataTable, TableHeader } from "react-mdl";
import { AppState, Communication } from "../types";
import { get_communications } from "../actions";
import { withRouter } from "react-router";


interface Props {
    router?: any;
    data: Array<Communication>;
    onLoad: () => void;
    reqInProgress: boolean;
    reqError: string;
}

//                      <DataTable
//                         id = "ildiocano"
//                         shadow={2}
//                         rows={this.props.data}
//                     >
//                        <TableHeader name="title">Title</TableHeader>
//                      </DataTable>

class Component extends React.Component<Props, {}> {
    render() {
        return (
            <div id="communications">
                <h3>Comunicazioni</h3>


                { this.props.reqError ? <p>{this.props.reqError}</p> : null }
                { this.props.reqInProgress ? <Spinner /> : null }
                { this.props.data ? (
                    <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                        <thead>
                            <tr>
                                <th
                                    className="mdl-data-table__cell--non-numeric"
                                >Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(comm => {
                                return (
                                    <tr key={comm.id}>
                                        <td onClick={this.handleClick.bind(this)(comm.id)} className="mdl-data-table__cell--non-numeric">
                                            {comm.title}
                                        </td>
                                    </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                    ) : null}
            </div>
        );
    }

    // Since we need to pass the communication id to the onClick function we
    // use currying to create a new function with the comm id inside
    handleClick(commID: string) {
        return () => {
            this.props.router.push(`/communications/${commID}`);
            return;
        }
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

export const Communications = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
