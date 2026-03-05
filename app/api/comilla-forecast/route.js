import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
            "https://api.ffwc.gov.bd/data_load/basin-wise-forecast/cumilla/latest/",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Comilla forecast data:", error);
        return NextResponse.json(
            { error: "Failed to fetch Comilla forecast data" },
            { status: 500 }
        );
    }
}
