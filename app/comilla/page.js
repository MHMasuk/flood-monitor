"use client";

import React, { useEffect, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import ComillaMainChart from "./components/ComillaMainChart";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "012-MDSIL",
        name: "(Upstream station of Comilla) Sonamura",
        title: "Hydrograph view of (Upstream station of Comilla) Sonamura (012-MDSIL)",
        titleBn: "কুমিল্লা উজান স্টেশন সোনামুরা (012-MDSIL) হাইড্রোগ্রাফ",
        paper_bgcolor: "#fde2e4",
    }
];

const BD_STATION_CONFIG = [
    {
        station_id: "23",
        name: "Comilla (SW110)",
        title: "Hydrograph view of Comilla (SW110)",
        titleBn: "কুমিল্লা (SW110) পানি সমতলের হাইড্রোগ্রাফ",
        hfl: "12.57",
        danger: "11.3",
        warning: "10.00",
        paper_bgcolor: "#e7d4f8",
    },
    {
        station_id: "29",
        name: "(Downstream station of Comilla) Debidwar (SW114)",
        title: "Hydrograph view of (Down stream of Comilla) Debidwar (SW114)",
        titleBn: "কুমিল্লা ভাটির স্টেশন দেবিদ্বার (SW114) এর হাইড্রোগ্রাফ",
        hfl: "9.36",
        danger: "8.09",
        warning: "7.00",
        paper_bgcolor: "#fef9c3",
    }
]

const ComillaPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");
    const [bdForecastData, setBdForecastData] = useState({});

    async function fetchComillaData() {
        try {
            const tokenData = await fetchTokenIfExpired();

            const response = await fetch('/api/comilla', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Custom-Token': `${tokenData}`,
                },
            });

            const data = await response.json();

            setStationData(data.data || []);
            setStationConfig(data.config || null);
            setStationName(data.station || "");
        } catch (error) {
            console.error('Error fetching Comilla data:', error);
        }
    }

    async function fetchBdForecastData() {
        try {
            // Fetch forecast data for all BD stations
            const fetchPromises = BD_STATION_CONFIG.map(async (config) => {
                try {
                    const response = await fetch(`/api/ffwc-forecast/${config.station_id}`);
                    const data = await response.json();

                    // Transform API response to match expected format
                    const transformedData = data.map(item => ({
                        datetime: item.fc_date,
                        value: parseFloat(item.waterlevel)
                    }));

                    return { station_id: config.station_id, data: transformedData };
                } catch (error) {
                    console.error(`Error fetching forecast for station ${config.station_id}:`, error);
                    return { station_id: config.station_id, data: [] };
                }
            });

            const results = await Promise.all(fetchPromises);

            // Convert array to object map
            const dataMap = {};
            results.forEach(result => {
                dataMap[result.station_id] = result.data;
            });

            setBdForecastData(dataMap);
        } catch (error) {
            console.error('Error fetching BD forecast data:', error);
        }
    }

    useEffect(() => {
        // Fetch data on component mount
        fetchComillaData();
        fetchBdForecastData();
    }, []);

    return (
        <div className="w-full py-4">
            <ComillaMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={BD_STATION_CONFIG}
                bdForecastData={bdForecastData}
                useDummyData={false}
            />
        </div>
    );
};

export default ComillaPage;