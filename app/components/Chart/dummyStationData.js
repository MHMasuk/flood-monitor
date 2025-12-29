// Dummy data for testing water level alerts
// Modify the dataValue to test sound alerts
//
// Station Info (from GeoJSON):
// - Warning Level: 27.94
// - Danger Level: 28.94
// - HFL: 29.83
//
// To test the sound:
// 1. Change any dataValue to >= 27.94 to trigger WARNING sound
// 2. Change any dataValue to >= 28.94 to trigger DANGER sound
//
// Current values are around 24.5m (below warning level)
// Try changing the last entry's dataValue to 28.0 or 29.0 to test

export const DUMMY_STATION_DATA = [
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-22T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-22T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-22T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-23T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-23T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-23T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.56,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-24T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-24T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-24T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-25T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-25T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-25T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-26T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20, 100.64.241.8",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-26T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.54,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20, 100.64.241.8",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-26T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.52,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20, 100.64.241.8",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-27T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.52,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-27T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.52,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-27T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.52,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-28T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.52,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-28T13:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.51,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-28T18:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        "dataValue": 24.47,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    },
    {
        "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
        "id": {
            "dataTime": "2025-12-29T08:00:00",
            "datatypeCode": "HHS",
            "stationCode": "019-MBDGHY"
        },
        "dataValidatedValue": null,
        // ⚠️ CHANGE THIS VALUE TO TEST SOUND ALERTS:
        // - Set to 28.0 to trigger WARNING sound (if only 1 point above warning)
        // - Set to 29.0 to trigger DANGER sound (if only 1 point above danger)
        // - Set to 30.0 to trigger HFL sound (if only 1 point above HFL 29.83)
        // Sound only plays if this is the FIRST point crossing the threshold
        "dataValue": 29.0,
        "userId": null,
        "dataReceptionDate": null,
        "clientIpAddress": "100.64.241.20",
        "datatypeCode": "HHS",
        "stationCode": "019-MBDGHY"
    }
    // {
    //     "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
    //     "id": {
    //         "dataTime": "2025-12-30T08:00:00",
    //         "datatypeCode": "HHS",
    //         "stationCode": "019-MBDGHY"
    //     },
    //     "dataValidatedValue": null,
    //     // ⚠️ CHANGE THIS VALUE TO TEST SOUND ALERTS:
    //     // - Set to 28.0 to trigger WARNING sound (if only 1 point above warning)
    //     // - Set to 29.0 to trigger DANGER sound (if only 1 point above danger)
    //     // - Set to 30.0 to trigger HFL sound (if only 1 point above HFL 29.83)
    //     // Sound only plays if this is the FIRST point crossing the threshold
    //     "dataValue": 29.56,
    //     "userId": null,
    //     "dataReceptionDate": null,
    //     "clientIpAddress": "100.64.241.20",
    //     "datatypeCode": "HHS",
    //     "stationCode": "019-MBDGHY"
    // }
];

// Dummy station info for testing (matching the data above)
export const DUMMY_STATION_INFO = {
    name: "Mathabhanga (Test Station)",
    warning: 27.94,
    danger: 28.94,
    hfl: 29.83
};

