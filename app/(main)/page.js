"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import TeestaMainChart from "./components/TeestaMainChart";

// India station configuration - supports multiple stations
const INDIA_STATION_CONFIG = [
    {
        stationCode: "022-LBDJPG"
    },
    {
        stationCode: "023-LBDJPG"
    },
];

const BD_STATION_CONFIG = [
    {
        series_id: "7068",
        name: "Dalia (SW291.5 R)",
        hfl: "52.84",
        danger: "52.15",
        warning: "51.75"
    },
    {
        series_id: "7110",
        name: "Doani (SW291.5 L)",
        hfl: "52.84",
        danger: "52.15",
        warning: "51.75"
    }
]

const TeestaPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");
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

        // Set up interval to fetch data every 15 minutes
        intervalRef.current = setInterval(() => {
            fetchTeestaData();
        }, 15 * 60 * 1000);

        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <main className="h-screen flex justify-center items-center">
            <TeestaMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={BD_STATION_CONFIG}
                useDummyData={false}
            />
        </main>
    );
};

export default TeestaPage;