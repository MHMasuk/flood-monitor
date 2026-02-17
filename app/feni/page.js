"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import TeestaMainChart from "./components/TeestaMainChart";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "013-MDSIL",
        name: "(Upstream station of Parshuram) - Belonia"
    },
    // {
    //     stationCode: "019-MBDGHY",
    //     name: "(Upstream station of Parshuram) - Amarpur"
    // },
];

const BD_STATION_CONFIG = [
    {
        series_id: "6022",
        name: "Parshuram (SW212)",
        // hfl: "12.95",
        // danger: "11.46",
        // warning: "10.00"

        hfl: "55.95",
        danger: "53.46",
        warning: "50.55"
    },
    {
        series_id: "6092",
        name: "(Down stream of Parshuram) - Horipur (SW213)",
        hfl: "6.612",
        danger: "5.08",
        warning: "5.00"
    }
]

const TeestaPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");
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

    useEffect(() => {
        // Fetch data on component mount
        fetchTeestaData();

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set up interval to fetch data based on refreshInterval state
        intervalRef.current = setInterval(() => {
            fetchTeestaData();
        }, refreshInterval * 60 * 1000);

        // Cleanup interval on component unmount or when interval changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [refreshInterval]); // Re-run when refreshInterval changes

    return (
        <div className="w-full py-4">
            <TeestaMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={BD_STATION_CONFIG}
                useDummyData={false}
                refreshInterval={refreshInterval}
                onRefreshIntervalChange={setRefreshInterval}
            />
        </div>
    );
};

export default TeestaPage;