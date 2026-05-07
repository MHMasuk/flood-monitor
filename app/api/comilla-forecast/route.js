import { NextResponse } from "next/server";

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const response = await fetch(
            "https://api.ffwc.gov.bd/data_load/basin-wise-forecast/cumilla/latest/",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                    'x-ffwc-internal-key': 'FFWC-Project-2026-Secure-V1', // Internal key for server validation
                    'Origin': 'https://ffwc.gov.bd',
                },
                cache: "no-store",
                next: { revalidate: 0 }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Return with cache-control headers
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        });
    } catch (error) {
        console.error("Error fetching Comilla forecast data:", error);
        return NextResponse.json(
            { error: "Failed to fetch Comilla forecast data" },
            { status: 500 }
        );
    }
}
