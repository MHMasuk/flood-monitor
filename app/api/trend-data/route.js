import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Use await instead of .then() and disable caching
        const res = await fetch('https://flood-ffwc.rimes.int/others/teesta-tank-plts/update.json', {
            cache: 'no-store' // Disable caching
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const response = await res.json();

        // console.log(response);

        // Send the data as a JSON response
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}