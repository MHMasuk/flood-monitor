"use client";

import React, { useEffect, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import ComillaMainChart from "./components/ComillaMainChart";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "012-MDSIL",
        name: "(Upstream station of Comilla) Sonamura"
    },
    {
        stationCode: "022-MDSIL",
        name: "(Upstream station of Comilla) Sonamura-||"
    },
];

const BD_STATION_CONFIG = [
    {
        series_id: "5624",
        name: "Comilla (SW110)",
        hfl: "14.9494",
        danger: "10.738",
        warning: "10.00"
    },
    {
        series_id: "5802",
        name: "Jibonpur (SW114)",
        hfl: "10.098",
        danger: "4.56",
        warning: "4.00"
    }
]

const ComillaPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");

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

    useEffect(() => {
        // Fetch data on component mount
        fetchComillaData();
    }, []);

    return (
        <div className="w-full py-4">
            <ComillaMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={BD_STATION_CONFIG}
                useDummyData={false}
            />
        </div>
    );
};

export default ComillaPage;