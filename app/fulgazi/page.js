"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import FulgaziMainChart from "./components/FulgaziMainChart";
import RainFall from "./components/RainFall";

// India station configuration - supports multiple stations (FFWC API)
const INDIA_STATION_CONFIG = [
    {
        stationCode: "013-MDSIL",
        source: "cwc", // "cwc" -> cwcdata.ffwc.gov.bd, "ffwc" (default) -> api.ffwc.gov.bd
        name: "(Upstream station of Fulgazi) Belonia",
        title: "Water Level Hydrograph Belonia (013-MDSIL)",
        titleBn: "বেলোনিয়া উজানের (013-MDSIL) স্টেশন পানি সমতলের হাইড্রোগ্রাফ",
        paper_bgcolor: "#fde2e4",
    }
];

const BD_STATION_CONFIG = [
    // {
    //     station_id: "5624",
    //     name: "Comilla (SW110)",
    //     title: "Hydrograph view of Comilla (SW110)",
    //     titleBn: "কুমিল্লা (SW110) পানি সমতলের হাইড্রোগ্রাফ",
    //     hfl: "12.57",
    //     danger: "11.3",
    //     warning: "10.00",
    //     paper_bgcolor: "#e7d4f8",
    // },
    // {
    //     station_id: "5802",
    //     name: "(Downstream station of Comilla) Debidwar (SW114)",
    //     title: "Hydrograph view of (Down stream of Comilla) Debidwar (SW114)",
    //     titleBn: "কুমিল্লার ভাটির স্টেশন দেবিদ্বার (SW114) এর হাইড্রোগ্রাফ",
    //     hfl: "9.36",
    //     danger: "8.09",
    //     warning: "7.00",
    //     paper_bgcolor: "#fef9c3",
    // },
    {
        station_id: "21",
        source: "ffwc-bd", // "ffwc-bd" -> api.ffwc.gov.bd (FFWC station id), default -> swh.bwdb.gov.bd (series id)
        name: "Parshuram",
        title: "Hydrograph view of Parshuram",
        titleBn: "পরশুরাম পানি সমতলের হাইড্রোগ্রাফ",
        // hfl & danger are loaded from the FFWC station info API (rhwl / dl)
        // warning: "11.55",
        paper_bgcolor: "#dbeafe",
    },
    {
        station_id: "136",
        source: "ffwc-bd", // "ffwc-bd" -> api.ffwc.gov.bd (FFWC station id), default -> swh.bwdb.gov.bd (series id)
        name: "Suber Bazar",
        title: "Hydrograph view of Suber Bazar",
        titleBn: "সুবার বাজার পানি সমতলের হাইড্রোগ্রাফ",
        // hfl & danger are loaded from the FFWC station info API (rhwl / dl)
        // warning: "9.00",
        paper_bgcolor: "#e7d4f8",
    }
]

const FulgaziPage = () => {
    const [stationData, setStationData] = useState([]);
    const [stationConfig, setStationConfig] = useState(null);
    const [stationName, setStationName] = useState("");
    const [bdForecastData, setBdForecastData] = useState({});
    const [bdStationInfo, setBdStationInfo] = useState({}); // station_id -> { danger, hfl } from FFWC station info API
    const [refreshInterval, setRefreshInterval] = useState(15); // Default 15 minutes
    const intervalRef = useRef(null);

    async function fetchFulgaziData() {
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
            console.error('Error fetching Fulgazi data:', error);
        }
    }

    async function fetchBdStationData() {
        try {
            const tokenData = await fetchTokenIfExpired();

            // Fetch station data for all BD stations
            const fetchPromises = BD_STATION_CONFIG.map(async (config) => {
                try {
                    const url = config.source === 'ffwc-bd'
                        ? `/api/ffwc-bd-station/${config.station_id}`
                        : `/api/bd-station/${config.station_id}`;

                    const response = await fetch(url, {
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

                    return { station_id: config.station_id, data: transformedData, station: result.station || null };
                } catch (error) {
                    console.error(`Error fetching data for station ${config.station_id}:`, error);
                    return { station_id: config.station_id, data: [] };
                }
            });

            const results = await Promise.all(fetchPromises);

            // Convert array to object map
            const dataMap = {};
            const infoMap = {};
            results.forEach(result => {
                dataMap[result.station_id] = result.data;
                if (result.station) {
                    infoMap[result.station_id] = result.station;
                }
            });

            setBdStationInfo(prev => ({ ...prev, ...infoMap }));

            setBdForecastData(dataMap);
        } catch (error) {
            console.error('Error fetching BD station data:', error);
        }
    }

    // Override danger/hfl with values from the FFWC station info API when available
    const bdStationConfigs = useMemo(() => BD_STATION_CONFIG.map(config => {
        const info = bdStationInfo[config.station_id];
        if (!info) return config;
        return {
            ...config,
            danger: info.danger != null ? String(info.danger) : config.danger,
            hfl: info.hfl != null ? String(info.hfl) : config.hfl,
        };
    }), [bdStationInfo]);

    useEffect(() => {
        // Fetch data on component mount
        fetchFulgaziData();
        fetchBdStationData();

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set up interval to fetch data based on refreshInterval state
        intervalRef.current = setInterval(() => {
            fetchFulgaziData();
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
            <FulgaziMainChart
                stationData={stationData}
                stationConfig={stationConfig}
                stationName={stationName}
                indiaStationConfigs={INDIA_STATION_CONFIG}
                bdStationConfigs={bdStationConfigs}
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

export default FulgaziPage;