"use client";

import MainChartNew from "@/app/components/Chart/mainChartNew";
import React, {useCallback, useEffect, useState} from "react";
import {fetchTokenIfExpired} from "@/utils/jwtToken";

const REFRESH_INTERVAL = 15 * 60 * 1000;
const REQUEST_TIMEOUT = 30 * 1000;

const initialStation = {data: [], loading: true, error: null};

// CWC data is fetched directly from the browser: cwcdata.ffwc.gov.bd sits behind
// Cloudflare, which blocks requests from Vercel's servers (HTTP 403 challenge),
// but allows browser requests and sends `Access-Control-Allow-Origin: *`.
const CWC_URL = 'https://cwcdata.ffwc.gov.bd/cwcdata/st_data.php?st_id=';

// Keep only water-level (HHS) readings, sorted by time ascending.
const toHhsSeries = (data) =>
    data
        .filter((entry) => entry?.id?.datatypeCode === 'HHS' && entry?.dataValue != null)
        .sort((a, b) => a.id.dataTime.localeCompare(b.id.dataTime));

// Each station is fetched independently so one failing/slow station
// never blocks the others from rendering.
const STATIONS = {
    mikliGong: {url: `${CWC_URL}023-LBDJPG`, auth: false, transform: toHhsSeries},
    domohoni: {url: `${CWC_URL}022-LBDJPG`, auth: false, transform: toHhsSeries},
    doania: {url: '/api/doani', auth: true},
    dalia: {url: '/api/dalia', auth: true},
};

async function fetchStation({url, auth, transform}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const headers = {};
        if (auth) {
            const token = await fetchTokenIfExpired();
            if (!token) throw new Error('Authentication failed');
            headers['Content-Type'] = 'application/json';
            headers['Custom-Token'] = token;
        }

        const response = await fetch(url, {headers, signal: controller.signal, cache: 'no-store'});
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const json = await response.json();
        const data = auth ? json?.data : json;
        if (!Array.isArray(data)) return [];
        return transform ? transform(data) : data;
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
