// Dummy data for testing BD station water level alerts
// Modify the last entry's value to test sound alerts
//
// Station Info (Dalia SW291.5 R):
// - Warning Level: 51.75
// - Danger Level: 52.15
// - HFL: 52.84
//
// To test the sound:
// 1. Change the last entry's value to >= 51.75 to trigger WARNING sound
// 2. Change the last entry's value to >= 52.15 to trigger DANGER sound
// 3. Change the last entry's value to >= 52.84 to trigger HFL sound
//
// Current values are around 50.0m (below warning level)
// Sound only plays if this is the FIRST point crossing the threshold

export const DUMMY_BD_STATION_DATA = [
    { "datetime": "2025-12-26T17:00:00", "value": 50.022 },
    { "datetime": "2025-12-26T18:00:00", "value": 50.009 },
    { "datetime": "2025-12-26T19:00:00", "value": 50.004 },
    { "datetime": "2025-12-26T20:00:00", "value": 50.023 },
    { "datetime": "2025-12-26T21:00:00", "value": 50.02 },
    { "datetime": "2025-12-26T22:00:00", "value": 50.044 },
    { "datetime": "2025-12-26T23:00:00", "value": 50.027 },
    { "datetime": "2025-12-27T00:00:00", "value": 50.053 },
    { "datetime": "2025-12-27T01:00:00", "value": 50.068 },
    { "datetime": "2025-12-27T02:00:00", "value": 50.075 },
    { "datetime": "2025-12-27T03:00:00", "value": 50.087 },
    { "datetime": "2025-12-27T04:00:00", "value": 50.077 },
    { "datetime": "2025-12-27T05:00:00", "value": 50.078 },
    { "datetime": "2025-12-27T06:00:00", "value": 50.054 },
    { "datetime": "2025-12-27T07:00:00", "value": 50.061 },
    { "datetime": "2025-12-27T08:00:00", "value": 50.062 },
    { "datetime": "2025-12-27T09:00:00", "value": 50.068 },
    { "datetime": "2025-12-27T10:00:00", "value": 50.068 },
    { "datetime": "2025-12-27T11:00:00", "value": 50.066 },
    { "datetime": "2025-12-27T12:00:00", "value": 50.068 },
    { "datetime": "2025-12-27T13:00:00", "value": 50.071 },
    { "datetime": "2025-12-27T14:00:00", "value": 50.065 },
    { "datetime": "2025-12-27T15:00:00", "value": 50.069 },
    { "datetime": "2025-12-27T16:00:00", "value": 50.065 },
    { "datetime": "2025-12-27T17:00:00", "value": 50.06 },
    { "datetime": "2025-12-27T18:00:00", "value": 50.065 },
    { "datetime": "2025-12-27T19:00:00", "value": 50.056 },
    { "datetime": "2025-12-27T20:00:00", "value": 50.063 },
    { "datetime": "2025-12-27T21:00:00", "value": 50.05 },
    { "datetime": "2025-12-27T22:00:00", "value": 50.052 },
    { "datetime": "2025-12-27T23:00:00", "value": 50.046 },
    { "datetime": "2025-12-28T00:00:00", "value": 50.05 },
    { "datetime": "2025-12-28T01:00:00", "value": 50.045 },
    { "datetime": "2025-12-28T02:00:00", "value": 50.036 },
    { "datetime": "2025-12-28T03:00:00", "value": 50.041 },
    { "datetime": "2025-12-28T04:00:00", "value": 50.039 },
    { "datetime": "2025-12-28T05:00:00", "value": 50.033 },
    { "datetime": "2025-12-28T06:00:00", "value": 50.041 },
    { "datetime": "2025-12-28T07:00:00", "value": 50.043 },
    { "datetime": "2025-12-28T08:00:00", "value": 50.039 },
    { "datetime": "2025-12-28T09:00:00", "value": 50.048 },
    { "datetime": "2025-12-28T10:00:00", "value": 50.047 },
    { "datetime": "2025-12-28T11:00:00", "value": 50.051 },
    { "datetime": "2025-12-28T12:00:00", "value": 50.055 },
    { "datetime": "2025-12-28T13:00:00", "value": 50.044 },
    { "datetime": "2025-12-28T14:00:00", "value": 50.056 },
    { "datetime": "2025-12-28T15:00:00", "value": 50.057 },
    { "datetime": "2025-12-28T16:00:00", "value": 50.058 },
    { "datetime": "2025-12-28T17:00:00", "value": 50.057 },
    { "datetime": "2025-12-28T18:00:00", "value": 50.067 },
    { "datetime": "2025-12-28T19:00:00", "value": 50.059 },
    { "datetime": "2025-12-28T20:00:00", "value": 50.058 },
    { "datetime": "2025-12-28T21:00:00", "value": 50.055 },
    { "datetime": "2025-12-28T22:00:00", "value": 50.045 },
    { "datetime": "2025-12-28T23:00:00", "value": 50.041 },
    { "datetime": "2025-12-29T00:00:00", "value": 50.046 },
    { "datetime": "2025-12-29T01:00:00", "value": 50.033 },
    { "datetime": "2025-12-29T02:00:00", "value": 50.036 },
    { "datetime": "2025-12-29T03:00:00", "value": 50.027 },
    { "datetime": "2025-12-29T04:00:00", "value": 50.028 },
    { "datetime": "2025-12-29T05:00:00", "value": 49.991 },
    { "datetime": "2025-12-29T06:00:00", "value": 49.999 },
    { "datetime": "2025-12-29T07:00:00", "value": 50.011 },
    { "datetime": "2025-12-29T08:00:00", "value": 50.023 },
    { "datetime": "2025-12-29T09:00:00", "value": 50.03 },
    { "datetime": "2025-12-29T10:00:00", "value": 50.034 },
    // ⚠️ CHANGE THIS VALUE TO TEST SOUND ALERTS:
    // - Set to 51.80 to trigger WARNING sound (>= 51.75)
    // - Set to 52.20 to trigger DANGER sound (>= 52.15)
    // - Set to 52.90 to trigger HFL sound (>= 52.84)
    { "datetime": "2025-12-29T10:45:00", "value": 50.032 }
];

// Dummy station info for testing
// (removed unused export to keep file simple)
