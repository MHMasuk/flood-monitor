"use client";

// api call
import MainChartNew from "@/app/components/Chart/mainChartNew";

import React, {useEffect, useRef, useState} from "react";

import {fetchTokenIfExpired} from "@/utils/jwtToken";

export default function Home() {
    const [mikliGongStationData, setMikliGongStationData] = useState([]);
    const [domohoniWaterLevelData, setDomohoniWaterLevelData] = useState([]);
    const [daliaStationData, setDaliaStationData] = useState([]);
    const [doaniaStationData, setDoaniaStationData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const intervalRef = useRef(null); // Create a ref to hold the interval ID

    async function fetchData(url, setData) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            // Set error state here
        }
    }

    async function fetchNewData(url, setData) {
        try {
            const tokenData = await fetchTokenIfExpired();

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Custom-Token': `${tokenData}`,
                },
            });
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            setData([]);
        }
    }

    useEffect(() => {
        // Fetch data on component mount
        fetchData('/api/mikligong', setMikliGongStationData);
        fetchData('/api/domohoni', setDomohoniWaterLevelData);
        fetchNewData('/api/doani', setDoaniaStationData);
        fetchNewData('/api/dalia', setDaliaStationData);

        // Set up interval to fetch data every 15 minutes
        intervalRef.current = setInterval(() => {
            fetchData('/api/mikligong', setMikliGongStationData);
            fetchData('/api/domohoni', setDomohoniWaterLevelData);
            fetchNewData('/api/doani', setDoaniaStationData);
            fetchNewData('/api/dalia', setDaliaStationData);
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
            {(daliaStationData?.length > 0) ? (
                <MainChartNew
                    mikliGongStationData={mikliGongStationData || []}
                    domohoniWaterLevelData={domohoniWaterLevelData || []}
                    daliaStationData={daliaStationData || []}
                    doaniaStationData={doaniaStationData || []}
                />
            ) : (
                // Loading state
                <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg text-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading chart data...</p>
                    <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the latest data</p>
                </div>
            )}
        </main>
    )
}