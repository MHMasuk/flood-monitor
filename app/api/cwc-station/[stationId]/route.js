import { NextResponse } from "next/server";
import { getCwcStationData } from "@/utils/getCwcStationData";

// Add this export to prevent prerendering during build time
export const dynamic = 'force-dynamic';

export async function GET(request, context) {
    // Extract station ID from the context params
    const { params } = context;
    const { stationId } = params;

    try {
        // Call the function to get CWC station data with the provided station ID
        const data = await getCwcStationData(stationId);

        // Send the data as a JSON response
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

