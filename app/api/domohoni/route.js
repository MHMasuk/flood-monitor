import {getDomohoniStationData} from "@/utils/getDomohoniStationData";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {

    // Call the function to get Domohoni station data
    const data = await getDomohoniStationData();

    // Send the data as a JSON response
    return NextResponse.json(data);
}