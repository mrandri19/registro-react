import * as React from "react";
import * as types from "../types";
import * as config from "../config";
import { upcase_first } from "../utils/upcase_first";

function display_date(input: string): string {
    let date = new Date(input);
    return `${date.getDay()}/${date.getDate()}/${date.getMonth()}`;
}

interface FileTeacherProps {
    fileTeacher: types.FileTeacher;
}

interface FileTeacherState {
    hidden: boolean;
}

export class FileTeacher extends React.Component<FileTeacherProps, FileTeacherState> {
    constructor(props: FileTeacherProps) {
     super(props);
        this.state = { hidden: false };
     }

    handleClick() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <li>
                <h4 style={{marginBottom: "0px"}} onClick={this.handleClick.bind(this)}>
                    {this.props.fileTeacher.name.toLocaleLowerCase().split(" ").map(upcase_first).join(" ") }
                    <i className="material-icons mdl-collapse__icon mdl-animation--default expand-icon-position">expand_more</i>
                </h4>

                {!this.state.hidden ? (
                    <ul>
                        {this.props.fileTeacher.folders.map(folder => <Folder folder={folder}/>) }
                    </ul>) : null}
            </li>);
    }
}

interface FolderProps {
    folder: types.Folder;
}

interface FolderState {
    hidden: boolean;
}

class Folder extends React.Component<FolderProps, FolderState> {
    constructor(props: FolderProps) {
     super(props);
        this.state = { hidden: false };
     }

    handleClick() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <li>
                <h5 onClick={this.handleClick.bind(this)}>
                    {this.props.folder.name}
                    <i className="material-icons mdl-collapse__icon mdl-animation--default expand-icon-position">expand_more</i>
                </h5>

                    { !this.state.hidden ? (
                        <ul>
                        {this.props.folder.elements.map(file => {
                            return (
                                <li key={file.id}>
                                    <a href={`${config.api_url}/file/${file.id}/${file.cksum}/download`}>{file.name}</a > <span>{display_date(file.date) }</span>
                                </li>
                            );
                        })}
                        </ul>) : null }
            </li>);
    }
}
