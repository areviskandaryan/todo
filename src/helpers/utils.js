export function formatDate(dateStr) {

    return (dateStr.slice(0, 10));

}


export function textCutter(string = "", maxLength) {
    if (string.length < maxLength || !maxLength) {
        return (string);
    }

    return (string.slice(0, maxLength) + "...")
}