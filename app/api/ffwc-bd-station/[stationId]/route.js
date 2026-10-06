import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// FFWC reports observation times in Bangladesh local time but labels them "+0000".
// Strip the bogus offset and convert BD local (UTC+6) to a UTC datetime string
// so it matches the BWDB (swh) series format used by the BD station charts.
function ffwcDateToUtc(wlDate) {
    const local = wlDate.replace(/([+-]\d{2}:?\d{2}|Z)$/, '');
    const utc = new Date(`${local}Z`);
    utc.setUTCHours(utc.getUTCHours() - 6);
    return utc.toISOString().slice(0, 19);
}

const FFWC_HEADERS = {
    'Content-Type': 'application/json',
    'x-ffwc-internal-key': process.env.FFWC_INTERNAL_KEY,
    'Origin': 'https://ffwc.gov.bd',
    'Referer': 'https://ffwc.gov.bd/',
};

// Station info: "dl" = danger level, "rhwl" = record highest water level (HFL)
async function fetchFfwcBdStationInfo(stationId) {
    try {
        const response = await fetch(
            `https://api.ffwc.gov.bd/data_load/stations-2025/${stationId}/`,
            { headers: FFWC_HEADERS, cache: 'no-store' }
        );

        if (!response.ok) {
            return null;
        }

        const info = await response.json();

        return {
            name: info.station,
            river: info.river,
            danger: info.dl ?? null,
            hfl: info.rhwl ?? null,
        };
    } catch (error) {
        console.error(`Error fetching FFWC BD station info for station ${stationId}:`, error);
        return null;
    }
}

async function fetchFfwcBdStationData(stationId) {
    try {
        const response = await fetch(
            `https://api.ffwc.gov.bd/data_load/seven-days-observed-waterlevel-by-station/${stationId}/`,
            { headers: FFWC_HEADERS, cache: 'no-store' }
        );

        if (!response.ok) {
            return { data: [], error: 'Failed to fetch data' };
        }

        const data = await response.json();

        const transformedData = (Array.isArray(data) ? data : [])
            .filter(item => item.wl_date && item.waterlevel !== null && item.waterlevel !== undefined)
            .map(item => ({
                datetime: ffwcDateToUtc(item.wl_date),
                value: item.waterlevel,
            }));

        return { data: transformedData };
    } catch (error) {
        console.error(`Error fetching FFWC BD station data for station ${stationId}:`, error);
        return { data: [], error: error.message };
    }
}

export async function GET(request, context) {
    const { params } = context;
    const { stationId } = params;

    if (!stationId) {
        return NextResponse.json({ error: 'Station ID is required' }, { status: 400 });
    }

    const [result, station] = await Promise.all([
        fetchFfwcBdStationData(stationId),
        fetchFfwcBdStationInfo(stationId),
    ]);

    return NextResponse.json({
        stationId: stationId,
        station: station,
        data: result.data,
        error: result.error || null
    });
}
