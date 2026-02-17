import { getFormattedDate } from "@/utils/healper";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Station configuration - Change these values to switch stations
const STATION_CONFIG = {
    // Comilla Station 1
    station1: {
        series_id: "6022",
        name: "Comilla Station 1 (SW212)",
        hfl: "12.95",
        danger: "11.46",
        warning: "10.00"
    },
    // Comilla Station 2
    station2: {
        series_id: "6092",
        name: "Comilla Station 2 (SW213)",
        hfl: "6.612",
        danger: "5.08",
        warning: "5.00"
    }
};

// Set the active station here
const ACTIVE_STATION = "station1";

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
