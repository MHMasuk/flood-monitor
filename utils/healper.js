// Function to get the local date
export function getLocalDate(date) {
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(date - offset);
}

// Function to format a date as 'YYYY-MM-DDTHH:MM:SS.sss' in local time
export function getFormattedDate(date) {
    return new Date(date).toISOString().slice(0, 23);
}
