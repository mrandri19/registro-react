import { Mark } from "../types";
import { grade_to_float } from "./grade_to_float";

export function calc_marks_mean(input: Mark[]): number {
    let firstSemesterMarks = input
        .filter(sub => !sub.ns) // && !sub.ns filters out the blue grades which shouldn't count
        .map(mark => grade_to_float(mark.mark))
        .filter(mark => mark !== undefined);
    let mean = firstSemesterMarks.reduce((acc, mark) => acc + mark, 0) / firstSemesterMarks.length;
    return mean;
}
