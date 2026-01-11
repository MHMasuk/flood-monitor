import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { station, date } = params;

        // Validate parameters
        if (!station || !date) {
            return NextResponse.json(
                { error: 'Station ID and date are required' },
                { status: 400 }
            );
        }

        // Fetch data from FFWC API
        const response = await fetch(
            `https://api.ffwc.gov.bd/data_load/trans-river-data-from-database/${station}/${date}`,
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
        console.error('Error fetching FFWC data:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
