import * as React from "react";
import { DataTable, TableHeader } from "react-mdl";


import { Subject } from "../types";
import { grade_to_float } from "../utils/grade_to_float";

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
    // subject.q can only be "q1" or "q3" so to use an arbitrary string we
    // create a new one of type any
    let marks = props.data.marks.map(sub => {
        let newSub: any = sub;
        let pre = (newSub.q === "q1");
        newSub.q = (pre ? "Primo" : "Secondo");
        return newSub;
    });

    return(
        <div>
            <DataTable
                shadow={2}
                rows = {marks}
            >
                <TableHeader name="mark">Voto</TableHeader>
                <TableHeader name="date">Data</TableHeader>
                <TableHeader name="q">Quadrimestre</TableHeader>
            </DataTable>
        </div>
    );
};
