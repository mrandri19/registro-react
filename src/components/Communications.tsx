import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { BasicRoute } from "./BasicRouteHOC";
import * as types from "../types";

import { Spinner, Textfield, List, ListItem, ListItemContent } from "react-mdl";
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
            let options: fuzzy.FilterOptions<Communication> = {
                extract: (comm: Communication) => comm.title,
            };
            let res = fuzzy.filter(this.state.searchTerm, this.props.data, options);
            communicationElements = res.map(matchResult => {
                const comm = matchResult.original;
                return (
                    <ListItem twoLine key={comm.id}>
                        <ListItemContent subtitle={display_date(comm.date)}>
                            <Link to={`/communications/${comm.id}`}>
                                <span>{comm.title}</span>
                            </Link>
                        </ListItemContent>
                    </ListItem>
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
                            floatingLabel
                            label="Cerca nelle comunicazioni"
                            onChange={(e) => {
                                const val = (e.target as any).value;
                                this.setState({
                                    searchTerm: val
                                });
                            } }
                            />
                        <List style={{ marginTop: "0px" }}>
                            {communicationElements}
                        </List>

                    </div>
                ) : null}
            </div>
        );
    }

    // Since we need to pass the communication id to the onClick function we

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
