import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// FFWC basin-wise discharge forecast (ensemble percentiles 5%-95%), e.g. "parshuram", "cumilla"
export async function GET(request, context) {
    const { basin } = context.params;

    if (!basin || !/^[a-z0-9_-]+$/i.test(basin)) {
        return NextResponse.json({ error: 'Valid basin name is required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.ffwc.gov.bd/data_load/basin-wise-forecast/${basin}/latest/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-ffwc-internal-key': process.env.FFWC_INTERNAL_KEY,
                    'Origin': 'https://ffwc.gov.bd',
                    'Referer': 'https://ffwc.gov.bd/',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0' }
        });
    } catch (error) {
        console.error(`Error fetching ${basin} basin forecast:`, error);
        return NextResponse.json(
            { error: `Failed to fetch ${basin} basin forecast` },
            { status: 500 }
        );
    }
}
