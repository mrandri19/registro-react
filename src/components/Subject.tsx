import * as React from "react";
import { Subject } from "../types";


interface Props {
    data: Subject;
    key: string;
}
export function Subject(props: Props) {
    let i = 0;
    return(
        <tr>
            <td>{props.data.name}</td>
            {props.data.marks.map(mark => {
                return(<td key={props.data.name+mark.mark+i++}>{mark.mark}</td>)
            })}
        </tr>
    );
};
