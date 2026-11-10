"use client";

import MainChartNew from "@/app/components/Chart/mainChartNew";
import React, {useCallback, useEffect, useState} from "react";
import {fetchTokenIfExpired} from "@/utils/jwtToken";

const REFRESH_INTERVAL = 15 * 60 * 1000;
const REQUEST_TIMEOUT = 30 * 1000;

const initialStation = {data: [], loading: true, error: null};

// Each station is fetched independently so one failing/slow station
// never blocks the others from rendering.
const STATIONS = {
    mikliGong: {url: '/api/mikligong', auth: false},
    domohoni: {url: '/api/domohoni', auth: false},
    doania: {url: '/api/doani', auth: true},
    dalia: {url: '/api/dalia', auth: true},
};

async function fetchStation({url, auth}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const headers = {'Content-Type': 'application/json'};
        if (auth) {
            const token = await fetchTokenIfExpired();
            if (!token) throw new Error('Authentication failed');
            headers['Custom-Token'] = token;
        }

        const response = await fetch(url, {headers, signal: controller.signal});
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const json = await response.json();
        const data = auth ? json?.data : json;
        return Array.isArray(data) ? data : [];
    } catch (error) {
        if (error.name === 'AbortError') throw new Error('Request timed out');
        throw error;
    } finally {
        clearTimeout(timer);
    }
}

export default function Home() {
    const [stations, setStations] = useState(() =>
        Object.fromEntries(Object.keys(STATIONS).map((key) => [key, initialStation]))
    );

    const loadStation = useCallback(async (key) => {
        setStations((prev) => ({...prev, [key]: {...prev[key], loading: true}}));
        try {
            const data = await fetchStation(STATIONS[key]);
            setStations((prev) => ({...prev, [key]: {data, loading: false, error: null}}));
        } catch (error) {
            console.error(`Error fetching ${key} data:`, error);
            // Keep previously loaded data (if any) but surface the error
            setStations((prev) => ({
                ...prev,
                [key]: {...prev[key], loading: false, error: error.message || 'Failed to load data'},
            }));
        }
    }, []);

    useEffect(() => {
        const loadAll = () => Object.keys(STATIONS).forEach(loadStation);
        loadAll();
        const interval = setInterval(loadAll, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [loadStation]);

    return (
        <main className="flex justify-center pt-16 pb-12 lg:h-screen lg:overflow-hidden">
            <MainChartNew
                mikliGongStationData={stations.mikliGong.data}
                domohoniWaterLevelData={stations.domohoni.data}
                daliaStationData={stations.dalia.data}
                doaniaStationData={stations.doania.data}
                stationStatus={stations}
                onRetry={loadStation}
            />
        </main>
    );
}
