// File: utils/getCwcStationData.js

export async function getCwcStationData(stationId = '022-LBDJPG') {
    const baseUrl = 'https://cwcdata.ffwc.gov.bd/cwcdata/st_data.php';

    const queryParams = new URLSearchParams({
        'st_id': stationId
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    const res = await fetch(finalUrl, {
        cache: 'no-store' // Disable caching to always get fresh data
    });

    if (!res.ok) {
        throw new Error('Failed to fetch CWC station data');
    }

    return res.json();
}
