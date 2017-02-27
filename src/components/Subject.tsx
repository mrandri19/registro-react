import * as React from "react";
import { DataTable, TableHeader } from "react-mdl";
import { merge } from "lodash";


import { Subject } from "../types";
import { calc_marks_mean } from "../utils/calc_marks_mean";
import { display_date } from "../utils/display_date";
import * as config from "../config";

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
        newSub.date = display_date(sub.date);
        newSub.q = (pre ? "Primo" : "Secondo");
        return newSub;
    });
    let firstSemesterMean = calc_marks_mean(props.data.marks.filter(sub => sub.q === "q1"));
    let secondSemesterMean = calc_marks_mean(props.data.marks.filter(sub => sub.q === "q3"));

    let year = (new Date()).getFullYear();
    return (

        <div>
            {(year === config.school_start_year) ?
                <p>Media primo quadrimestre: <span><b>{firstSemesterMean.toFixed(2)}</b></span></p> :
                <p>Media secondo quadrimestre: <span><b>{isNaN(secondSemesterMean) ? "Non hai voti nel secondo quadrimestre" : secondSemesterMean.toFixed(2)}</b></span></p>}
            <DataTable
                shadow={0}
                rows={marks}
                >
                <TableHeader name="mark">Voto</TableHeader>
                <TableHeader name="date">Data</TableHeader>
                <TableHeader name="type">Tipo</TableHeader>
                <TableHeader name="q">Quadrimestre</TableHeader>
            </DataTable>
        </div>
    );
};
