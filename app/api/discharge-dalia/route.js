import {NextResponse} from "next/server";

const url = "https://flood-ffwc.rimes.int/others/teesta-tank-plts/";

// Function to fetch the file list from the URL
async function fetchFileList() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error fetching file list:", error);
        return null;
    }
}

// Function to parse the date from a filename in the format "DDMMYYYY"
function parseDateFromFileName(fileName) {
    const match = fileName.match(/(\d{2})(\d{2})(\d{4})\.png/);
    if (match) {
        const day = match[1];
        const month = match[2];
        const year = match[3];
        return new Date(`${year}-${month}-${day}`);
    }
    return null;
}

// Main function to find the latest date and list file names
async function findLatestDateAndListFileNames() {
    const fileList = await fetchFileList();
    if (!fileList) return;

    const fileNames = fileList.match(/\d{8}\.png/g) || [];

    let latestDate = new Date(1970, 0, 1); // A date far in the past
    let latestFileName = null;

    fileNames.forEach((fileName) => {
        const date = parseDateFromFileName(fileName);
        if (date > latestDate) {
            latestDate = date;
            latestFileName = fileName;
        }
    });

    return latestFileName
}

export async function GET() {

    // const response = await fetch("https://flood-ffwc.rimes.int/others/teesta-tank-plts/probability.date.json");
    // const json_data = await response.json();
    // console.log(JSON.stringify(dates));
    // const json_data = dates


    const date = await findLatestDateAndListFileNames()




    // Send the data as a JSON response
    return NextResponse.json(date);
}