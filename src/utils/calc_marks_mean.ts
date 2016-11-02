import { Mark } from "../types";

export function calc_marks_mean(input: Mark[]): number {
    let firstSemesterMarks = input
        .filter(sub => !sub.ns)
        .map(mark => mark.mark) // && !sub.ns filters out the blue grades which shouldn't count
    let mean = firstSemesterMarks.reduce((acc, mark) => acc + mark, 0) / firstSemesterMarks.length;
    return mean;
}