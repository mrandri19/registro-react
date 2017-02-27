export function display_date(input: string): string {
    let date = new Date(input);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
