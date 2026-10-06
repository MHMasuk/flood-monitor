// File: utils/getFfsStationData.js
// Fetches observed water level (HHS) directly from the India CWC Flood Forecasting System (ffs.india-water.gov.in).
// Response has the same shape as cwcdata.ffwc.gov.bd: [{ id: { dataTime, stationCode, datatypeCode }, dataValue }]

function expression(fieldName, operator, value) {
    return { expression: { valueIsRelationField: false, fieldName, operator, value } };
}

export async function getFfsStationData(stationId, days = 7) {
    const baseUrl = 'https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted';

    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().replace('Z', '');

    const specification = {
        where: {
            where: {
                where: expression('id.stationCode', 'eq', stationId),
                and: expression('id.datatypeCode', 'eq', 'HHS'),
            },
            and: expression('dataValue', 'null', 'false'),
        },
        and: expression('id.dataTime', 'gte', from),
    };

    const sortCriteria = {
        sortOrderDtos: [{ sortDirection: 'ASC', field: 'id.dataTime' }],
    };

    const queryParams = new URLSearchParams({
        'sort-criteria': JSON.stringify(sortCriteria),
        'specification': JSON.stringify(specification),
    });

    const res = await fetch(`${baseUrl}?${queryParams.toString()}`, {
        headers: {
            'Accept': 'application/json',
            'class-name': 'com.eptisa.dto.SimpleNewEntryDataDto',
            'Referer': 'https://ffs.india-water.gov.in/',
        },
        cache: 'no-store' // Disable caching to always get fresh data
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to fetch FFS station data (HTTP ${res.status}): ${body.slice(0, 200)}`);
    }

    return res.json();
}
