import { getFormattedDate } from "@/utils/healper";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

async function fetchBdStationData(token, seriesId) {
    try {
        const response = await fetch(
            `https://swh.bwdb.gov.bd/api/observation?series_id=${seriesId}&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 7))}&date_to=${getFormattedDate(new Date())}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                next: { revalidate: 30 }
            }
        );

        if (!response.ok) {
            return { data: [], error: 'Failed to fetch data' };
        }

        const data = await response.json();

        // Filter data to show only 3-hour intervals (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00)
        const filteredData = (data.data || []).filter(item => {
            const date = new Date(item.datetime);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            // Only include entries at exact 3-hour intervals with 0 minutes
            return hours % 3 === 0 && minutes === 0;
        });

        return { data: filteredData };
    } catch (error) {
        console.error(`Error fetching BD station data for series ${seriesId}:`, error);
        return { data: [], error: error.message };
    }
}

export async function GET(request, context) {
    const { params } = context;
    const { seriesId } = params;
    const token = request.headers.get("Custom-Token");

    if (!seriesId) {
        return NextResponse.json({ error: 'Series ID is required' }, { status: 400 });
    }

    const result = await fetchBdStationData(token, seriesId);

    return NextResponse.json({
        seriesId: seriesId,
        data: result.data,
        error: result.error || null
    });
}

