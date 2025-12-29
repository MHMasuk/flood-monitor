"use client";

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from "next/dynamic";
import { DUMMY_STATION_DATA, DUMMY_STATION_INFO } from './dummyStationData';

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const IndiaSiteLineChart = ({
    stationCode,
    paperColor = '#ffffff',
    useDummyData = false,
    chartId = '',
    onThresholdCrossed = null // Callback when threshold is crossed
}) => {
    const [chartHeight, setChartHeight] = useState(400);
    const [chartData, setChartData] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stationInfo, setStationInfo] = useState({
        name: '',
        warning: null,
        danger: null,
        hfl: null
    });
    const [hasTriggeredWarning, setHasTriggeredWarning] = useState(false);
    const [hasTriggeredDanger, setHasTriggeredDanger] = useState(false);
    const [hasTriggeredHfl, setHasTriggeredHfl] = useState(false);

    // Check if water level has crossed warning, danger, or HFL levels
    // Calls onThresholdCrossed callback when FIRST point crosses a threshold
    const checkWaterLevelAlerts = useCallback((data, stationData) => {
        if (!data || data.length === 0 || !stationData.warning) return;

        // Sort data by time to ensure correct order
        const sortedData = [...data].sort((a, b) =>
            new Date(a.id?.dataTime || a.dataTime) - new Date(b.id?.dataTime || b.dataTime)
        );

        // Count how many points are above each threshold
        const countAboveHfl = stationData.hfl ? sortedData.filter(d => d.dataValue >= stationData.hfl).length : 0;
        const countAboveDanger = stationData.danger ? sortedData.filter(d => d.dataValue >= stationData.danger).length : 0;
        const countAboveWarning = stationData.warning ? sortedData.filter(d => d.dataValue >= stationData.warning).length : 0;

        const latestValue = sortedData[sortedData.length - 1]?.dataValue;
        console.log(`[${chartId}] Checking alerts - Latest: ${latestValue}, Above HFL: ${countAboveHfl}, Above Danger: ${countAboveDanger}, Above Warning: ${countAboveWarning}`);

        // Only trigger if exactly 1 point crossed the threshold (first time crossing)
        if (latestValue !== null && latestValue !== undefined) {
            // Check HFL - only if exactly 1 point above HFL (first crossing)
            if (stationData.hfl && countAboveHfl === 1 && latestValue >= stationData.hfl && !hasTriggeredHfl) {
                console.log(`🔴 [${chartId}] HFL level crossed for first time! Current: ${latestValue}, HFL: ${stationData.hfl}`);
                setHasTriggeredHfl(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
            // Check Danger - only if exactly 1 point above Danger (first crossing)
            else if (stationData.danger && countAboveDanger === 1 && latestValue >= stationData.danger && !hasTriggeredDanger && !hasTriggeredHfl) {
                console.log(`🚨 [${chartId}] Danger level crossed for first time! Current: ${latestValue}, Danger: ${stationData.danger}`);
                setHasTriggeredDanger(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
            // Check Warning - only if exactly 1 point above Warning (first crossing)
            else if (stationData.warning && countAboveWarning === 1 && latestValue >= stationData.warning && !hasTriggeredWarning && !hasTriggeredDanger && !hasTriggeredHfl) {
                console.log(`⚠️ [${chartId}] Warning level crossed for first time! Current: ${latestValue}, Warning: ${stationData.warning}`);
                setHasTriggeredWarning(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
        }
    }, [hasTriggeredWarning, hasTriggeredDanger, hasTriggeredHfl, chartId, onThresholdCrossed]);

    // Function to update the chart height based on screen size
    const updateChartHeight = () => {
        const screenHeight = window.innerHeight;
        const desiredHeight = screenHeight * 0.4;
        setChartHeight(desiredHeight);
    };

    // Fetch station info from GeoJSON
    const fetchStationInfo = async () => {
        // Use dummy station info if useDummyData is true
        if (useDummyData) {
            setStationInfo(DUMMY_STATION_INFO);
            return;
        }
        if (!stationCode) return;

        try {
            const response = await fetch('/India_Basin_Info_Details_with_station_id.geojson');
            if (!response.ok) {
                throw new Error('Failed to fetch GeoJSON data');
            }
            const geoJsonData = await response.json();

            // Find station by station_code
            const stationFeature = geoJsonData.features.find(
                feature => feature.properties.station_code === stationCode
            );

            if (stationFeature) {
                const props = stationFeature.properties;
                setStationInfo({
                    name: props.station_name || '',
                    warning: parseFloat(props.warning_level) || null,
                    danger: parseFloat(props.danger_level) || null,
                    hfl: parseFloat(props.highest_flow_level) || null
                });
            }
        } catch (err) {
            console.error('Error fetching station info:', err);
        }
    };

    // Fetch data from the API
    const fetchData = async (isInitial = false) => {
        if (!stationCode && !useDummyData) return;

        if (isInitial) {
            setInitialLoading(true);
        }
        setError(null);

        try {
            let data;
            if (useDummyData) {
                // Use dummy data from dummyStationData.js for testing
                data = DUMMY_STATION_DATA;
            } else {
                const response = await fetch(`/api/cwc-station/${stationCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                data = await response.json();
            }
            setChartData(data);

            // Check water level alerts after data is fetched
            checkWaterLevelAlerts(data, stationInfo);
        } catch (err) {
            setError(err.message);
        } finally {
            if (isInitial) {
                setInitialLoading(false);
            }
        }
    };

    useEffect(() => {
        updateChartHeight();
        window.addEventListener('resize', updateChartHeight);
        return () => window.removeEventListener('resize', updateChartHeight);
    }, []);

    useEffect(() => {
        fetchStationInfo();
        fetchData(true); // Initial load

        // Refresh data every 5 minutes (silent refresh, no loading state)
        const interval = setInterval(() => fetchData(false), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [stationCode]);

    // Re-check water level alerts when stationInfo or chartData changes
    useEffect(() => {
        if (chartData.length > 0 && stationInfo.warning) {
            checkWaterLevelAlerts(chartData, stationInfo);
        }
    }, [stationInfo, chartData, checkWaterLevelAlerts]);


    // Loading state (only show on initial load)
    if (initialLoading) {
        return (
            <div
                className="w-full rounded-lg relative flex items-center justify-center"
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
            >
                Loading data for {stationInfo.name || stationCode}...
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div
                className="w-full rounded-lg relative flex items-center justify-center"
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
            >
                Error: {error}
            </div>
        );
    }

    // No data state
    if (!chartData || chartData.length === 0) {
        return (
            <div
                className="w-full rounded-lg relative flex items-center justify-center"
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
            >
                No data available for {stationInfo.name || stationCode}.
            </div>
        );
    }

    // Process India API data format
    // Data comes with id.dataTime and dataValue
    const processedData = chartData
        .filter(entry => entry.dataValue !== null && entry.dataValue !== undefined)
        .map(entry => ({
            datetime: entry.id?.dataTime || entry.dataTime,
            value: entry.dataValue
        }))
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    const plotData = [
        {
            x: processedData.map(item => item.datetime),
            y: processedData.map(item => item.value),
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'green' },
            name: 'Measured Water Level',
        },
        {
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [stationInfo.warning, stationInfo.warning],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'yellow' },
            name: 'Warning',
        },
        {
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [stationInfo.danger, stationInfo.danger],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#FFCC00' },
            name: 'Danger',
        },
        {
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [stationInfo.hfl, stationInfo.hfl],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'red' },
            name: 'HFL',
        },
    ];

    const chartTitle = stationInfo.name
        ? `Hydrograph view of - ${stationInfo.name}`
        : `Hydrograph view of - ${stationCode}`;

    const layout = {
        title: chartTitle,
        xaxis: {
            tickmode: 'linear',
            tickformat: '%d %b %Y',
            automargin: true,
            nticks: 10,
            tickfont: { size: 10 }
        },
        yaxis: { title: 'Water Level (m)' },
        legend: { orientation: 'h' },
        paper_bgcolor: paperColor,
        margin: { l: 60, r: 60, t: 40, b: 80 },
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    };

    return (
        <div className="w-full rounded-lg relative">

            <Plot
                data={plotData}
                layout={layout}
                style={{ height: chartHeight + 'px' }}
                config={config}
            />
        </div>
    );
};

export default IndiaSiteLineChart;

