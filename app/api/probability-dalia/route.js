import { NextResponse } from "next/server";

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

// Function to parse the date from a filename in the format "exceedenceYYYYMMDD.png"
function parseDateFromFileName(fileName) {
    const match = fileName.match(/exceendence(\d{4})(\d{2})(\d{2})\.png/);
    if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        return `${year}${month}${day}`;
    }
    return null;
}

// Main function to find the latest date and list file names
async function findLatestDateAndListFileNames() {
    const fileList = await fetchFileList();
    if (!fileList) return;

    const fileNames = fileList.match(/exceendence\d{8}\.png/g) || [];

    let latestDate = "19700101"; // A date far in the past in "YYYYMMDD" format
    let latestFileName = null;

    fileNames.forEach((fileName) => {
        const date = parseDateFromFileName(fileName);
        if (date > latestDate) {
            latestDate = date;
            latestFileName = fileName;
        }
    });

    return latestDate;
}

export async function GET() {
    const pageContent = await findLatestDateAndListFileNames();

    let date = `exceendence${pageContent}.png`


    return NextResponse.json(date);
}
