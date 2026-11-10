import {getFormattedDate} from "@/utils/healper";
import {NextResponse} from "next/server";

export async function GET(request) {
    try {
        const JWTToken = request.headers.get("Custom-Token");

        const response = await fetch(`https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 3))}&date_to=${getFormattedDate(new Date())}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWTToken}`,
            },
            next: {revalidate: 30}, // in every 15 minutes
            signal: AbortSignal.timeout(25000),
        })

        if (!response.ok) {
            return NextResponse.json({data: [], error: `Upstream error: ${response.status}`}, {status: 502});
        }

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching station data:', error);
        return NextResponse.json({data: [], error: error.message || 'Failed to fetch data'}, {status: 502});
    }
}

