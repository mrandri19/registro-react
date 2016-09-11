export function grade_to_float(grade: string): number {
    let table: {[key: string]: number} = {"10": 10,
                 "9/10": 9.75,
                 "9.75": 9.75,
                 "9½": 9.5,
                 "9+": 9.25,
                 "9": 9,
                 "8/9": 8.75,
                 "8.75": 8.75,
                 "8½": 8.5,
                 "8+": 8.25,
                 "8": 8,
                 "7/8": 7.75,
                 "7.75": 7.75,
                 "7½": 7.5,
                 "7+": 7.25,
                 "7": 7,
                 "6/7": 6.75,
                 "6.75": 6.75,
                 "6½": 6.5,
                 "6+": 6.25,
                 "6": 6,
                 "5/6": 5.75,
                 "5.75": 5.75,
                 "5½": 5.5,
                 "5+": 5.25,
                 "5": 5,
                 "4/5": 4.75,
                 "4.75": 4.75,
                 "4½": 4.5,
                 "4+": 4.25,
                 "4": 4,
                 "3/4": 3.75,
                 "3.75": 3.75,
                 "3½": 3.5,
                 "3+": 3.25,
                 "3": 3,
                 "2/3": 2.75,
                 "2.75": 2.75,
                 "2½": 2.5,
                 "2+": 2.25,
                 "2": 2
    };
    return table[grade];
}
