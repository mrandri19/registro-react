import { upcase_first } from "./upcase_first";
export function upcase_first_in_sentence(sentence: string) {
    let name = sentence.split(" ").map(s => s.toLocaleLowerCase());
    const first = upcase_first(name[0]);
    name[0] = first;
    return name.join(" ");
}
