// Dummy data for testing India station (013-MDSIL - Belonia) water level
// This is the upstream station of Parshuram
//
// Station Info (013-MDSIL Belonia):
// - Warning Level: 14.00
// - Danger Level: 15.00
// - HFL: 16.98
//
// To test the sound:
// 1. Change the last entry's waterlevel to >= 14.0 to trigger WARNING sound
// 2. Change the last entry's waterlevel to >= 15.0 to trigger DANGER sound
// 3. Change the last entry's waterlevel to >= 16.98 to trigger HFL sound
//
// Current values are around 12.0m (below warning level)
// Sound only plays if this is the FIRST point crossing the threshold

// Generate dummy data for the past 3 days
const generateDummyData = () => {
    const data = [];
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 3);

    // Base water level around 12m (below warning level of 14m)
    let baseLevel = 11.5;

    // Generate hourly data for 3 days
    for (let i = 0; i < 72; i++) {
        const dataTime = new Date(startDate);
        dataTime.setHours(dataTime.getHours() + i);

        // Add some variation to simulate realistic water level changes
        const variation = Math.sin(i / 6) * 0.3 + (Math.random() - 0.5) * 0.2;
        const waterLevel = baseLevel + variation + (i * 0.01); // Slight upward trend

        data.push({
            data_time: dataTime.toISOString().replace('T', ' ').slice(0, 19),
            waterlevel: waterLevel.toFixed(2)
        });
    }

    return data;
};

// Pre-generated static dummy data for consistent testing
export const DUMMY_INDIA_STATION_DATA = [
    { "data_time": "2026-02-26 00:00:00", "waterlevel": "11.52" },
    { "data_time": "2026-02-26 01:00:00", "waterlevel": "11.58" },
    { "data_time": "2026-02-26 02:00:00", "waterlevel": "11.65" },
    { "data_time": "2026-02-26 03:00:00", "waterlevel": "11.71" },
    { "data_time": "2026-02-26 04:00:00", "waterlevel": "11.78" },
    { "data_time": "2026-02-26 05:00:00", "waterlevel": "11.83" },
    { "data_time": "2026-02-26 06:00:00", "waterlevel": "11.87" },
    { "data_time": "2026-02-26 07:00:00", "waterlevel": "11.89" },
    { "data_time": "2026-02-26 08:00:00", "waterlevel": "11.91" },
    { "data_time": "2026-02-26 09:00:00", "waterlevel": "11.92" },
    { "data_time": "2026-02-26 10:00:00", "waterlevel": "11.93" },
    { "data_time": "2026-02-26 11:00:00", "waterlevel": "11.95" },
    { "data_time": "2026-02-26 12:00:00", "waterlevel": "11.98" },
    { "data_time": "2026-02-26 13:00:00", "waterlevel": "12.02" },
    { "data_time": "2026-02-26 14:00:00", "waterlevel": "12.08" },
    { "data_time": "2026-02-26 15:00:00", "waterlevel": "12.14" },
    { "data_time": "2026-02-26 16:00:00", "waterlevel": "12.19" },
    { "data_time": "2026-02-26 17:00:00", "waterlevel": "12.23" },
    { "data_time": "2026-02-26 18:00:00", "waterlevel": "12.26" },
    { "data_time": "2026-02-26 19:00:00", "waterlevel": "12.28" },
    { "data_time": "2026-02-26 20:00:00", "waterlevel": "12.30" },
    { "data_time": "2026-02-26 21:00:00", "waterlevel": "12.31" },
    { "data_time": "2026-02-26 22:00:00", "waterlevel": "12.33" },
    { "data_time": "2026-02-26 23:00:00", "waterlevel": "12.36" },
    { "data_time": "2026-02-27 00:00:00", "waterlevel": "12.40" },
    { "data_time": "2026-02-27 01:00:00", "waterlevel": "12.45" },
    { "data_time": "2026-02-27 02:00:00", "waterlevel": "12.51" },
    { "data_time": "2026-02-27 03:00:00", "waterlevel": "12.56" },
    { "data_time": "2026-02-27 04:00:00", "waterlevel": "12.62" },
    { "data_time": "2026-02-27 05:00:00", "waterlevel": "12.67" },
    { "data_time": "2026-02-27 06:00:00", "waterlevel": "12.71" },
    { "data_time": "2026-02-27 07:00:00", "waterlevel": "12.73" },
    { "data_time": "2026-02-27 08:00:00", "waterlevel": "12.75" },
    { "data_time": "2026-02-27 09:00:00", "waterlevel": "12.76" },
    { "data_time": "2026-02-27 10:00:00", "waterlevel": "12.78" },
    { "data_time": "2026-02-27 11:00:00", "waterlevel": "12.81" },
    { "data_time": "2026-02-27 12:00:00", "waterlevel": "12.85" },
    { "data_time": "2026-02-27 13:00:00", "waterlevel": "12.90" },
    { "data_time": "2026-02-27 14:00:00", "waterlevel": "12.96" },
    { "data_time": "2026-02-27 15:00:00", "waterlevel": "13.02" },
    { "data_time": "2026-02-27 16:00:00", "waterlevel": "13.08" },
    { "data_time": "2026-02-27 17:00:00", "waterlevel": "13.12" },
    { "data_time": "2026-02-27 18:00:00", "waterlevel": "13.15" },
    { "data_time": "2026-02-27 19:00:00", "waterlevel": "13.17" },
    { "data_time": "2026-02-27 20:00:00", "waterlevel": "13.19" },
    { "data_time": "2026-02-27 21:00:00", "waterlevel": "13.21" },
    { "data_time": "2026-02-27 22:00:00", "waterlevel": "13.24" },
    { "data_time": "2026-02-27 23:00:00", "waterlevel": "13.28" },
    { "data_time": "2026-02-28 00:00:00", "waterlevel": "13.33" },
    { "data_time": "2026-02-28 01:00:00", "waterlevel": "13.39" },
    { "data_time": "2026-02-28 02:00:00", "waterlevel": "13.45" },
    { "data_time": "2026-02-28 03:00:00", "waterlevel": "13.51" },
    { "data_time": "2026-02-28 04:00:00", "waterlevel": "13.56" },
    { "data_time": "2026-02-28 05:00:00", "waterlevel": "13.60" },
    { "data_time": "2026-02-28 06:00:00", "waterlevel": "13.63" },
    { "data_time": "2026-02-28 07:00:00", "waterlevel": "13.65" },
    { "data_time": "2026-02-28 08:00:00", "waterlevel": "13.67" },
    { "data_time": "2026-02-28 09:00:00", "waterlevel": "13.69" },
    { "data_time": "2026-02-28 10:00:00", "waterlevel": "13.72" },
    { "data_time": "2026-02-28 11:00:00", "waterlevel": "13.76" },
    // { "data_time": "2026-02-28 12:00:00", "waterlevel": "13.81" },
    // { "data_time": "2026-02-28 13:00:00", "waterlevel": "13.86" },
    // { "data_time": "2026-02-28 14:00:00", "waterlevel": "13.91" },
    // { "data_time": "2026-02-28 15:00:00", "waterlevel": "13.95" },
    // { "data_time": "2026-02-28 16:00:00", "waterlevel": "13.98" },
    // { "data_time": "2026-02-28 17:00:00", "waterlevel": "14.00" },
    // { "data_time": "2026-02-28 18:00:00", "waterlevel": "14.02" },
    // { "data_time": "2026-02-28 19:00:00", "waterlevel": "14.04" },
    // { "data_time": "2026-02-28 20:00:00", "waterlevel": "14.06" },
    // { "data_time": "2026-02-28 21:00:00", "waterlevel": "14.09" },
    // { "data_time": "2026-02-28 22:00:00", "waterlevel": "14.13" },
    // { "data_time": "2026-02-28 23:00:00", "waterlevel": "14.18" },
    // // ⚠️ CHANGE THIS VALUE TO TEST SOUND ALERTS:
    // // - Set to 14.0 to trigger WARNING sound (>= 14.0)
    // // - Set to 15.0 to trigger DANGER sound (>= 15.0)
    // // - Set to 17.0 to trigger HFL sound (>= 16.98)
    // { "data_time": "2026-03-01 00:00:00", "waterlevel": "13.50" }
];

export default DUMMY_INDIA_STATION_DATA;
