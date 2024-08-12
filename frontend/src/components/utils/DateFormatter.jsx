

export default function DateFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0'); //gets Month (0-indexed, therefore +1), padStart adds 0 at start if length is not 2
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}