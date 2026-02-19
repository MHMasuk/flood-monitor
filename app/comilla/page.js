"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import ComillaMainChart from "./components/ComillaMainChart";
import RainFall from "./components/RainFall";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "012-MDSIL",
        name: "(Upstream station of Comilla) Sonamura",
        title: "Hydrograph view of (Upstream station of Comilla) Sonamura (012-MDSIL)",
        titleBn: "কুমিল্লার উজান স্টেশন সোনামুরা (012-MDSIL) হাইড্রোগ্রাফ",
        paper_bgcolor: "#fde2e4",
    }
];

const BD_STATION_CONFIG = [
    {
        station_id: "5624",
        name: "Comilla (SW110)",
        title: "Hydrograph view of Comilla (SW110)",
        titleBn: "কুমিল্লা (SW110) পানি সমতলের হাইড্রোগ্রাফ",
        hfl: "12.57",
        danger: "11.3",
        warning: "10.00",
        paper_bgcolor: "#e7d4f8",
    },
    {
        station_id: "5802",
        name: "(Downstream station of Comilla) Debidwar (SW114)",
        title: "Hydrograph view of (Down stream of Comilla) Debidwar (SW114)",
        titleBn: "কুমিল্লার ভাটির স্টেশন দেবিদ্বার (SW114) এর হাইড্রোগ্রাফ",
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
    const [refreshInterval, setRefreshInterval] = useState(15); // Default 15 minutes
    const intervalRef = useRef(null);

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

    async function fetchBdStationData() {
        try {
            const tokenData = await fetchTokenIfExpired();

            // Fetch station data for all BD stations
            const fetchPromises = BD_STATION_CONFIG.map(async (config) => {
                try {
                    const response = await fetch(`/api/bd-station/${config.station_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Custom-Token': `${tokenData}`,
                        },
                    });

                    const result = await response.json();

                    // Transform API response to match expected format
                    const transformedData = (result.data || []).map(item => ({
                        datetime: item.datetime,
                        value: parseFloat(item.value)
                    }));

                    return { station_id: config.station_id, data: transformedData };
                } catch (error) {
                    console.error(`Error fetching data for station ${config.station_id}:`, error);
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
            console.error('Error fetching BD station data:', error);
        }
    }

    useEffect(() => {
        // Fetch data on component mount
        fetchComillaData();
        fetchBdStationData();

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set up interval to fetch data based on refreshInterval state
        intervalRef.current = setInterval(() => {
            fetchComillaData();
            fetchBdStationData();
        }, refreshInterval * 60 * 1000);

        // Cleanup interval on component unmount or when interval changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [refreshInterval]); // Re-run when refreshInterval changes

    return (
        <div className="w-full h-full">
            <ComillaMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={BD_STATION_CONFIG}
                bdForecastData={bdForecastData}
                useDummyData={false}
                refreshInterval={refreshInterval}
                onRefreshIntervalChange={setRefreshInterval}
                showRainfall={true}
                RainfallComponent={RainFall}
            />
        </div>
    );
};

export default ComillaPage;