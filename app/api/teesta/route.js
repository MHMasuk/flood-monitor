import { getFormattedDate } from "@/utils/healper";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Station configuration - Change these values to switch stations
const STATION_CONFIG = {
    // Dalia Station (SW291.5 R)
    dalia: {
        series_id: "7068",
        name: "Dalia (SW291.5 R)",
        hfl: "52.84",
        danger: "52.15",
        warning: "51.75"
    },
    // Doani Station (SW291.5 L)
    doani: {
        series_id: "7110",
        name: "Doani (SW291.5 L)",
        hfl: "52.84",
        danger: "52.15",
        warning: "51.75"
    }
};

// Set the active station here
const ACTIVE_STATION = "dalia";

async function fetchStationData(token, stationKey) {
    const station = STATION_CONFIG[stationKey];
    
    if (!station) {
        console.error(`Station "${stationKey}" not found in config`);
        return { data: [], config: null };
    }

    try {
        const response = await fetch(
            `https://swh.bwdb.gov.bd/api/observation?series_id=${station.series_id}&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 3))}&date_to=${getFormattedDate(new Date())}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                next: { revalidate: 30 }
            }
        );

        if (!response.ok) return { data: [], config: station };
        const data = await response.json();
        return { data: data.data || [], config: station };
    } catch (error) {
        console.error(`Error fetching ${station.name} data:`, error);
        return { data: [], config: station };
    }
}

export async function GET(request) {
    const token = request.headers.get("Custom-Token");

    const result = await fetchStationData(token, ACTIVE_STATION);

    return NextResponse.json({
        station: ACTIVE_STATION,
        data: result.data,
        config: result.config
    });
}
