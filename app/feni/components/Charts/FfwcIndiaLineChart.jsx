"use client";

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from "next/dynamic";
import { useLanguage } from "@/app/context/LanguageContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const FfwcIndiaLineChart = ({
    stationCode,
    stationName,
    paperColor = '#ffffff',
    chartId = '',
    title, // English title
    titleBn, // Bangla title (optional)
    onThresholdCrossed = null, // Callback when threshold is crossed
    refreshInterval = 15 // Refresh interval in minutes (default: 15)
}) => {
    console.log("title", title)
    const { language } = useLanguage();
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
    const checkWaterLevelAlerts = useCallback((data, stationData) => {
        if (!data || data.length === 0 || !stationData.warning) return;

        // Sort data by time to ensure correct order
        const sortedData = [...data].sort((a, b) =>
            new Date(a.data_time) - new Date(b.data_time)
        );

        // Count how many points are above each threshold
        const countAboveHfl = stationData.hfl ? sortedData.filter(d => parseFloat(d.waterlevel) >= stationData.hfl).length : 0;
        const countAboveDanger = stationData.danger ? sortedData.filter(d => parseFloat(d.waterlevel) >= stationData.danger).length : 0;
        const countAboveWarning = stationData.warning ? sortedData.filter(d => parseFloat(d.waterlevel) >= stationData.warning).length : 0;

        const latestValue = parseFloat(sortedData[sortedData.length - 1]?.waterlevel);
        console.log(`[${chartId}] Checking alerts - Latest: ${latestValue}, Above HFL: ${countAboveHfl}, Above Danger: ${countAboveDanger}, Above Warning: ${countAboveWarning}`);

        // Only trigger if exactly 1 point crossed the threshold (first time crossing)
        if (latestValue !== null && latestValue !== undefined && !isNaN(latestValue)) {
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

    // Fetch data from the FFWC API
    const fetchData = async (isInitial = false) => {
        if (!stationCode) return;

        if (isInitial) {
            setInitialLoading(true);
        }
        setError(null);

        try {
            // Calculate date (7 days ago from today for historical data)
            const date = new Date();
            date.setDate(date.getDate() - 3);
            const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            const response = await fetch(`/api/ffwc/${stationCode}/${formattedDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            setChartData(data);

            // Check water level alerts after data is fetched
            checkWaterLevelAlerts(data, stationInfo);
        } catch (err) {
            console.error('Error fetching FFWC data:', err);
            setError(err.message);
        } finally {
            if (isInitial) {
                setInitialLoading(false);
            }
        }
    };

    // Initialize chart and set up listeners
    useEffect(() => {
        updateChartHeight();
        fetchStationInfo();

        const handleResize = () => updateChartHeight();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Fetch data when stationCode or stationInfo changes
    useEffect(() => {
        if (stationCode && stationInfo.name) {
            fetchData(true);

            // Set up periodic refresh based on refreshInterval prop
            const interval = setInterval(() => {
                fetchData(false);
            }, refreshInterval * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [stationCode, stationInfo.name, refreshInterval]); // Added refreshInterval to dependencies

    // Prepare data for Plotly
    const preparePlotData = () => {
        if (!chartData || chartData.length === 0) return [];

        // Sort data by time
        const sortedData = [...chartData].sort((a, b) =>
            new Date(a.data_time) - new Date(b.data_time)
        );

        // Extract timestamps and water levels
        const timestamps = sortedData.map(item => new Date(item.data_time));
        const waterLevels = sortedData.map(item => parseFloat(item.waterlevel));

        const traces = [
            {
                x: timestamps,
                y: waterLevels,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Water Level',
                line: { color: 'green', width: 2 },
                marker: { size: 6, color: 'green' }
            }
        ];

        // Add warning line
        if (stationInfo.warning) {
            traces.push({
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [stationInfo.warning, stationInfo.warning],
                type: 'scatter',
                mode: 'lines',
                name: 'Warning Level',
                line: { color: 'orange', width: 2, dash: 'dot' }
            });
        }

        // Add danger line
        if (stationInfo.danger) {
            traces.push({
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [stationInfo.danger, stationInfo.danger],
                type: 'scatter',
                mode: 'lines',
                name: 'Danger Level',
                line: { color: 'red', width: 2, dash: 'dot' }
            });
        }

        // Add HFL line
        if (stationInfo.hfl) {
            traces.push({
                x: [timestamps[0], timestamps[timestamps.length - 1]],
                y: [stationInfo.hfl, stationInfo.hfl],
                type: 'scatter',
                mode: 'lines',
                name: 'HFL',
                line: { color: 'darkred', width: 2, dash: 'dot' }
            });
        }

        return traces;
    };

    const layout = {
        title: {
            text: language === 'bn' && titleBn ? titleBn : title,
            font: { size: 16, family: 'Arial, sans-serif' }
        },
        xaxis: {
            title: 'Date & Time',
            type: 'date',
            tickformat: '%d-%b %H:%M',
            showgrid: true,
            tickangle: 0,
            automargin: true,
            tickmode: 'auto',
            nticks: 7
        },
        yaxis: {
            title: 'Water Level (m)',
            showgrid: true
        },
        paper_bgcolor: paperColor,
        plot_bgcolor: '#ffffff',
        margin: { l: 60, r: 40, t: 60, b: 60 },
        height: chartHeight,
        showlegend: true,
        legend: {
            orientation: 'h',
            y: -0.2,
            x: 0.5,
            xanchor: 'center'
        }
    };

    if (initialLoading) {
        return (
            <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white rounded-lg">
                <div className="text-center">
                    <div className="loading loading-spinner loading-md"></div>
                    <p className="text-gray-500 mt-2">Loading {stationCode}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-96 flex items-center justify-center border border-red-200 bg-red-50 rounded-lg">
                <div className="text-center">
                    <p className="text-red-600 font-semibold">Error loading data</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    if (!chartData || chartData.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white rounded-lg">
                <div className="text-center">
                    <p className="text-gray-600">No data available for {stationCode}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <Plot
                data={preparePlotData()}
                layout={layout}
                config={{
                    responsive: true,
                    displayModeBar: false,
                    displaylogo: false
                }}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default FfwcIndiaLineChart;

