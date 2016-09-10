import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { AppState, IPORCODIO } from "../types";
import { get_communication } from "../actions";

interface Props {
    params: any;
    data: IPORCODIO;
    onLoad: (commID: string) => void;
}

class Component extends React.Component<Props, {}> {
    render() {
        return(
            <div>
                <p>{"DIOCANO"}</p>
                <p>{JSON.stringify(this.props.data[this.props.params.id])}</p>
            </div>
        );
    }
    componentDidMount() {
        console.log(this.props.data);

        // Don't download if we already have the data
        if (this.props.data[this.props.params.id] !== undefined) {
            return;
        }
        this.props.onLoad(this.props.params.id);
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
        data: state.communications.descriptions
    };
}

export const CommunicationPage = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
