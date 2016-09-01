import * as React from "react";
import { DataTable, TableHeader } from "react-mdl";
import { merge } from "lodash";


import { Subject } from "../types";
import { grade_to_float } from "../utils/grade_to_float";

interface Props {
    data: Subject;
}
export function Subject(props: Props) {
    // subject.q can only be "q1" or "q3" so to use an arbitrary string we
    // create a new one of type any

    // Could merge use too much memory?, hope it doesn't
    // a better approach would be to mutate the props.data object and then
    // check if q was already changed to "Primo" or "Secondo"
    let marks = props.data.marks.map(sub => {
        let newSub: any = merge({}, sub);
        let pre = (newSub.q === "q1");
        newSub.q = (pre ? "Primo" : "Secondo");
        return newSub;
    });

    // Hummm...
    // I shouldn't have read RealWorldHaskell
    let firstSemesterMean = props.data.marks
        .filter(sub => sub.q === "q1" && !sub.ns) // && !sub.ns filters out the blue grades which shouldn't count
        .map(mark => grade_to_float(mark.mark))
        .filter(mark => mark !== undefined)
        .reduce((acc, mark) => acc + mark, 0) / props.data.marks.filter(sub => sub.q === "q1" && !sub.ns).length;

    let secondSemesterMean = props.data.marks
        .filter(sub => sub.q === "q3" && !sub.ns)
        .map(mark => grade_to_float(mark.mark))
        .filter(mark => mark !== undefined)
        .reduce((acc, mark) => acc + mark, 0) / props.data.marks.filter(sub => sub.q === "q3" && !sub.ns).length;


    return(
        <div>
            <p>Media primo quadrimestre: <span><b>{firstSemesterMean.toFixed(2)}</b></span></p>
            <p>Media secondo quadrimestre: <span><b>{secondSemesterMean.toFixed(2)}</b></span></p>
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
