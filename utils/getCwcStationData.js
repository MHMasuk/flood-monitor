// File: utils/getCwcStationData.js

export async function getCwcStationData(stationId = '022-LBDJPG') {
    const baseUrl = 'https://cwcdata.ffwc.gov.bd/cwcdata/st_data.php';

    const queryParams = new URLSearchParams({
        'st_id': stationId
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    const headers = {};
    if (process.env.CWC_BASIC_AUTH) {
        headers['Authorization'] = `Basic ${process.env.CWC_BASIC_AUTH}`;
    }

    const res = await fetch(finalUrl, {
        headers,
        cache: 'no-store' // Disable caching to always get fresh data
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to fetch CWC station data (HTTP ${res.status}): ${body.slice(0, 200)}`);
    }

    return res.json();
}

// Water-level (HHS) series for a CWC station, sorted by time ascending.
export async function getCwcHhsSeries(stationId) {
    const data = await getCwcStationData(stationId);
    if (!Array.isArray(data)) return [];

    return data
        .filter((entry) => entry?.id?.datatypeCode === 'HHS' && entry?.dataValue != null)
        .sort((a, b) => a.id.dataTime.localeCompare(b.id.dataTime));
}
