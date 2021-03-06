import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import * as types from "../types";
import { BasicRoute } from "./BasicRouteHOC";

import { get_files } from "../actions";
import { Spinner, Grid } from "react-mdl";
import { FileTeacher } from "./FileTeacher";

interface Props extends types.OnLogoutRedirectComponent {
    onLoad: () => void;
    data: types.FileTeacher[];
    reqInProgress: boolean;
    reqError: string;
}


class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>Files</h3>
            {this.props.reqError ? <p>{this.props.reqError}</p> : null}
            {this.props.reqInProgress ? <Spinner /> : null}
            {this.props.data ? (
                <Grid>
                    {this.props.data.map(fileTeacher => <FileTeacher fileTeacher={fileTeacher} key={fileTeacher.name} />)}
                </Grid>
            ) : null}
        </div>);
    }
    componentDidMount() {
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(get_files());
        }
    };
}

function mapStateToProps(state: AppState): any {
    return {
        reqInProgress: state.files.reqInProgress,
        data: state.files.data,
        reqError: state.files.reqError,
        logged: state.logged
    };
}

export const Files = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
