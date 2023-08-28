import {getMikliGongStationData} from "@/utils/getMikliGongStationData";
import {NextResponse} from "next/server";

export async function GET() {

    // Call the function to get Domohoni station data
    const data = await getMikliGongStationData();

    // Send the data as a JSON response
    return NextResponse.json(data);
}