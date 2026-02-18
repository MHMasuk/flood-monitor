import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { stationId } = params;

        // Validate parameter
        if (!stationId) {
            return NextResponse.json(
                { error: 'Station ID is required' },
                { status: 400 }
            );
        }

        // Fetch seven-days forecast water level data from FFWC API
        const response = await fetch(
            `https://api.ffwc.gov.bd/data_load/seven-days-forecast-waterlevel-by-station/${stationId}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // Disable caching for fresh data
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch data from FFWC API' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching FFWC seven-days forecast data:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
