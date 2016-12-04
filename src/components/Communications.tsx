import * as React from "react";
import { connect } from "react-redux";

import { BasicRoute } from "./BasicRouteHOC";
import * as types from "../types";

import { Spinner, Textfield } from "react-mdl";
import { AppState, Communication } from "../types";
import { get_communications } from "../actions";
import { display_date } from "../utils/display_date";
import * as fuzzy from "fuzzy";

interface Props extends types.OnLogoutRedirectComponent {
    data: Array<Communication>;
    onLoad: () => void;
    reqInProgress: boolean;
    reqError: string;
}

interface State {
    searchTerm: string;
}

class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    render() {
        let communicationElements: JSX.Element[] | null;
        communicationElements = null;
        if (this.props.data) {
            let options = {
                extract: (comm: Communication) => comm.title
            };
            let res = fuzzy.filter(this.state.searchTerm, this.props.data, options);
            let matchedCommunications = res.map(function (el) { return el.original; });
            communicationElements = matchedCommunications.map(comm => {
                return (
                    <tr key={comm.id}>
                        <td onClick={this.handleClick.bind(this)(comm.id)} className="mdl-data-table__cell--non-numeric">
                            <span>{comm.title}</span><span style={{ float: "right" }}>{display_date(comm.date)}</span>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="appPadding">
                <h3>Comunicazioni</h3>


                {this.props.reqError ? <p>{this.props.reqError}</p> : null}
                {this.props.reqInProgress ? <Spinner /> : null}
                {this.props.data ? (
                    <div>
                        <Textfield
                            ref="a"
                            label="daw"
                            expandable
                            expandableIcon="search"
                            onChange={(e) => {
                                const val = (e.target as any).value;
                                this.setState({
                                    searchTerm: val
                                });
                            } }
                            />
                        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp dottedTable">
                            <thead>
                                <tr>
                                    <th
                                        className="mdl-data-table__cell--non-numeric"
                                        >Titolo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    communicationElements
                                }
                            </tbody>
                        </table></div>
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
        };
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
        reqError: state.communications.reqError,
        logged: state.logged
    };
}

export const Communications = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
