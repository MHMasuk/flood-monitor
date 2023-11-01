import {getDomohoniStationData} from "@/utils/getDomohoniStationData";
import {NextResponse} from "next/server";

export async function GET() {

    const response = await fetch("https://flood-ffwc.rimes.int/others/teesta-tank-plts/probability.date.json");
    const json_data = await response.json();
    // console.log(JSON.stringify(dates));
    // const json_data = dates


    // Send the data as a JSON response
    return NextResponse.json(json_data);
}