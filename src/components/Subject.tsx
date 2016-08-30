import * as React from "react";
import { Subject } from "../types";
import { grade_to_float } from "../utils/grade_to_float";
import { upcase_first } from "../utils/upcase_first";

function grade_to_danger_level(mark_str: string) {
    let mark = grade_to_float(mark_str);
    if (mark >= 6) {
        return "grade_ok";
    } else if (mark < 6) {
        return "grade_not_ok";
    } else {
        return null;
    }
}

interface Props {
    data: Subject;
}
export function Subject(props: Props) {
    let i = 0;
    return(
        <table>
            <tbody>
                <tr>
                    <td>{upcase_first(props.data.name)}</td>
                    {props.data.marks.map(mark => {
                        let danger_level = grade_to_danger_level(mark.mark);
                        return(
                            <td className={danger_level} key={props.data.name + mark.mark + i++}>
                                {mark.mark}
                            </td>);
                    })}
                </tr>
            </tbody>
        </table>
    );
};
