"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import TeestaMainChart from "./components/TeestaMainChart";
import RainFall from "./components/RainFall";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "013-MDSIL",
        name: "(Upstream station of Parshuram) Belonia",
        title: "Hydrograph view of (Upstream station of Parshuram) Belonia (013-MDSIL)",
        titleBn: "পরশুরামের উজান স্টেশন বেলোনিয়ার (013-MDSIL) হাইড্রোগ্রাফ",
        paper_bgcolor: "#fde2e4",
    }
];

const BD_STATION_CONFIG = [
    {
        // station_id: "21",
        station_id: "6022",
        name: "Parshuram (SW212)",
        title: "Hydrograph view of Parshuram (SW212)",
        titleBn: "পরশুরাম (SW212) পানি সমতলের হাইড্রোগ্রাফ",
        // hfl: "12.95",
        // danger: "11.46",
        // warning: "10.00"

        hfl: "14.79",
        danger: "12.55",
        warning: "11.00",
        paper_bgcolor: "#e7d4f8",
    },
    {
        station_id: "6092",
        name: "(Down stream of Parshuram) Horipur_C (SW213)",
        title: "Hydrograph view of (Down stream of Parshuram) Horipur_C (SW213)",
        titleBn: "পরশুরামের ভাটির স্টেশন হরিপুর_সি (SW213) এর হাইড্রোগ্রাফ",
        hfl: "6.612",
        danger: "5.08",
        warning: "5.00",
        paper_bgcolor: "#fef9c3",
    }
]

const TeestaPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");
    const [bdForecastData, setBdForecastData] = useState({});
    const [refreshInterval, setRefreshInterval] = useState(15); // Default 15 minutes
    const intervalRef = useRef(null);

    async function fetchTeestaData() {
        try {
            const tokenData = await fetchTokenIfExpired();

            const response = await fetch('/api/teesta', {
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
            console.error('Error fetching Teesta data:', error);
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
        fetchTeestaData();
        fetchBdStationData();

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set up interval to fetch data based on refreshInterval state
        intervalRef.current = setInterval(() => {
            fetchTeestaData();
            fetchBdStationData();
        }, refreshInterval * 60 * 1000);

        // Cleanup interval on component unmount or when interval changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [refreshInterval]); // Re-run when refreshInterval changes

    // Auto-reload page every day at 11 PM
    useEffect(() => {
        const checkAndReload = () => {
            const now = new Date();
            const targetHour = 23; // 11 PM in 24-hour format
            const targetMinute = 0;

            // Check if current time is 11:00 PM (within 1 minute window)
            if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
                console.log('Auto-reloading page at 11:00 PM');
                window.location.reload();
            }
        };

        // Check every minute
        const reloadInterval = setInterval(checkAndReload, 60000);

        // Also check immediately on mount
        checkAndReload();

        return () => clearInterval(reloadInterval);
    }, []);

    return (
        <div className="w-full h-full">
            <TeestaMainChart
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

export default TeestaPage;