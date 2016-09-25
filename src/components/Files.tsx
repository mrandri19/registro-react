import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { FileTeacher } from "../types";
import { get_files } from "../actions";
import { Spinner} from "react-mdl";
import * as config from "../config";
import { upcase_first } from "../utils/upcase_first";


interface Props {
    onLoad: () => void;
    data: FileTeacher[];
    reqInProgress: boolean;
    reqError: string;
};

function display_date(input: string): string {
    let date = new Date(input);
    return `${date.getDay()}/${date.getDate()}/${date.getMonth()}`;
}

interface FileTeacherElemProps {
    fileTeacher: FileTeacher;
}

class FileTeacherElem extends React.Component<FileTeacherElemProps, {}> {
    handleClick() {
        console.log("clicked");
    }

    render() {
        return (
            <li>
                <h4 onClick={this.handleClick.bind(this)} style={{marginBottom: "0px"}}>
                    {this.props.fileTeacher.name.toLocaleLowerCase().split(" ").map(upcase_first).join(" ") }
                    <i className="material-icons mdl-collapse__icon mdl-animation--default expand-icon-position">expand_more</i>
                </h4>
                <ul>
                    {this.props.fileTeacher.folders.map(folder => {
                        return (
                            <li key={this.props.fileTeacher.name + folder.name}>
                                <h5>
                                    {folder.name}
                                    <i className="material-icons mdl-collapse__icon mdl-animation--default expand-icon-position">expand_more</i>
                                </h5>
                                <ul>
                                    {folder.elements.map(file => {
                                        return (
                                            <li key={file.id}>
                                                <a href={`${config.api_url}/file/${file.id}/${file.cksum}/download`}>{file.name}</a > <span>{display_date(file.date) }</span>
                                            </li>
                                        );
                                    }) }
                                </ul>
                            </li>
                        );
                    }) }
                </ul>
            </li>);
    }
}

class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>Files</h3>
            { this.props.reqError ? <p>{this.props.reqError}</p> : null }
            { this.props.reqInProgress ? <Spinner /> : null }
            { this.props.data ? (
                <ul className="filesList">
                    {this.props.data.map(fileTeacher => {
                        return (<FileTeacherElem fileTeacher={fileTeacher} key={fileTeacher.name} />);
                    })}
                </ul>
            ) : null}
        </div>);
    }
    componentDidMount() {
        // Don't download if we already have the data
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
};

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
        reqError: state.files.reqError
    };
};

export const Files = connect(mapStateToProps, mapDispatchToProps)(Component);
