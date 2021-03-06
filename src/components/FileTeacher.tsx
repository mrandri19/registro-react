import * as React from "react";
import * as types from "../types";
import * as config from "../config";
import { upcase_first } from "../utils/upcase_first";
import { display_date } from "../utils/display_date";
import { Card, CardTitle, Cell } from "react-mdl";

interface FileTeacherProps {
    fileTeacher: types.FileTeacher;
}

interface FileTeacherState {
    hidden: boolean;
}

function colors() {
    let list = ["#E57373",
        "#F06292",
        "#BA68C8",
        "#9575CD",
        "#7986CB",
        "#64B5F6",
        "#4fC3F7",
        "#4DD0E1",
        "#4DB6AC",
        "#81C784",
        "#AED581",
        "#DCE775",
        "#FFD54F",
        "#FFB74D",
        "#FF8A65",
        "#90A4AE"];
    return list[Math.floor(Math.random() * list.length)];
}

export class FileTeacher extends React.Component<FileTeacherProps, FileTeacherState> {
    render() {
        return (
            <Cell col={3} phone={12} tablet={6}>
                <Card shadow={2} className="fileTeacher" style={{ marginBottom: "1em" }}>
                    <CardTitle style={{ backgroundColor: colors(), color: "#FFF" }}>
                        {this.props.fileTeacher.name.toLocaleLowerCase().split(" ").map(upcase_first).join(" ")}
                    </CardTitle>
                    <ul style={{ margin: "1em", padding: "16px", paddingTop: 0 }}>
                        {this.props.fileTeacher.folders.map(folder => <Folder key={folder.name + this.props.fileTeacher.name} folder={folder} />)}
                    </ul>
                </Card>
            </Cell>);
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
            <li className="noListBulletPoints">
                <h5 onClick={this.handleClick.bind(this)} style={{ margin: 0 }} className="transparentSelection">
                    {this.props.folder.name}
                    <i className={`material-icons mdl-collapse__icon mdl-animation--default expand-icon-position ${this.state.hidden ? "icon-rotated" : "icon-normal"}`}>expand_more</i>
                </h5>

                {!this.state.hidden ? (
                    <ul>
                        {this.props.folder.elements.map(file => {
                            return (
                                <li key={file.id} style={{ marginTop: "10px", marginBottom: "10px" }}>
                                    <a href={`${config.api_url}/file/${file.id}/${file.cksum}/download`}>{file.name || "Senza Nome"}</a > <span>{display_date(file.date)}</span>
                                </li>
                            );
                        })}
                    </ul>) : null}
            </li>);
    }
}
