// Function to convert datetime strings to UTC
export function convertToUTCBDData(data) {
    return data.map(item => {
        const localDate = new Date(item.datetime);
        const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
        return {
            datetime: utcDate.toISOString(),
            value: item.value
        };
    });
}


// Function to convert datetime to GMT+6
export function convertToGMTPlus6(datetimeString) {
    // Create a Date object from the datetime string
    const date = new Date(datetimeString);

    // Get the current time zone offset in minutes
    const currentTimezoneOffset = date.getTimezoneOffset();

    // Calculate the new time zone offset for GMT+6 (in minutes)
    const gmtPlus6Offset = 360; // GMT+6 is 6 hours ahead of UTC

    // Calculate the new date by adding the offset
    date.setMinutes(date.getMinutes() + (gmtPlus6Offset - currentTimezoneOffset));

    // Return the new date as a string
    return date.toISOString();
}


export function convertToGMTPlus6And24Hours(datetimeString) {
    // Create a Date object from the datetime string
    const date = new Date(datetimeString);

    console.log("date..........", date)

    // // Get the current time zone offset in minutes
    // const currentTimezoneOffset = date.getTimezoneOffset();
    //
    // // Calculate the new time zone offset for GMT+6 (in minutes)
    // const gmtPlus6Offset = -360; // GMT+6 is 6 hours ahead of UTC
    //
    // // Calculate the new date by adding the offset
    // date.setMinutes(date.getMinutes() + (gmtPlus6Offset - currentTimezoneOffset));

    // Format the date and time in 24-hour format
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    // Return the formatted date as a string
    return formattedDate;
}