import {getMikliGongStationData} from "@/utils/getMikliGongStationData";
import {NextResponse} from "next/server";

// Add this export to prevent prerendering during build time
export const dynamic = 'force-dynamic';

export async function GET() {

    // Call the function to get Domohoni station data
    const data = await getMikliGongStationData();

    // Send the data as a JSON response
    return NextResponse.json(data);
}