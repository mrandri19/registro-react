import * as React from "react";
import { connect } from "react-redux";
import { Spinner } from "react-mdl";

import { BasicRoute } from "./BasicRouteHOC";
import * as types from "../types";

import { AppState } from "../types";
import { get_communication } from "../actions";
import * as config from "../config";


interface Props extends types.OnLogoutRedirectComponent {
    params: any;
    data: { [key: string]: types.CommunicationDescription };
    onLoad: (commID: string) => void;
}

class Component extends React.Component<Props, {}> {
    render() {
        let comm = this.props.data[this.props.params.id];
        // TODO: implement spinner
        return (
            <div className="appPadding">
                {(comm === undefined) ? <Spinner /> :
                    <div>
                        <h3>{comm.longTitle}</h3>
                        <p>{comm.desc}</p>
                        {comm.attachment ?
                            <a href={config.api_url + `/communication/${this.props.params.id}/download`}>
                                Allegato
                        </a> : null}
                    </div>
                }
            </div>
        );
    }
    componentDidMount() {
        if (this.props.data[this.props.params.id] === undefined) {
            return this.props.onLoad(this.props.params.id);
        }
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: (commID: string) => {
            dispatch(get_communication(commID));
        }
    };
}

function mapStateToProps(state: AppState) {
    return {
        data: state.communications.descriptions,
        logged: state.logged
    };
}

export const CommunicationPage = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
