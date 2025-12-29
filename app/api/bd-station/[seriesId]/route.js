import { getFormattedDate } from "@/utils/healper";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

async function fetchBdStationData(token, seriesId) {
    try {
        const response = await fetch(
            `https://swh.bwdb.gov.bd/api/observation?series_id=${seriesId}&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 3))}&date_to=${getFormattedDate(new Date())}`,
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
        return { data: data.data || [] };
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

