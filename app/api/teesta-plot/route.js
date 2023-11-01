import {getDomohoniStationData} from "@/utils/getDomohoniStationData";
import {NextResponse} from "next/server";

export async function GET() {

    const response = await fetch("https://flood-ffwc.rimes.int/others/teesta-tank-plts/date.json");
    const dates = await response.text();
    // console.log(JSON.stringify(dates));
    const json_data = dates

    let data = 11

    // Send the data as a JSON response
    return NextResponse.json(json_data);
}