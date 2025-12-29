"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from "next/dynamic";
import { convertToGMTPlus6 } from "@/utils/convertToUtc";
import { DUMMY_BD_STATION_DATA } from './dummyBdStationData';

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TeestaLineChart = ({
    chart_data,
    title,
    hfl,
    danger,
    warning,
    paperColor,
    chartId = '',
    onThresholdCrossed = null,
    useDummyData = false
}) => {
    const [chartHeight, setChartHeight] = useState(400);
    const [hasTriggeredWarning, setHasTriggeredWarning] = useState(false);
    const [hasTriggeredDanger, setHasTriggeredDanger] = useState(false);
    const [hasTriggeredHfl, setHasTriggeredHfl] = useState(false);

    const updateChartHeight = () => {
        const screenHeight = window.innerHeight;
        const desiredHeight = screenHeight * 0.4;
        setChartHeight(desiredHeight);
    };

    // Determine which data to use: real API data or dummy data (memoized)
    const dataToUse = useMemo(() => (useDummyData ? DUMMY_BD_STATION_DATA : (chart_data || [])), [useDummyData, chart_data]);

    // Check if water level has crossed thresholds
    const checkWaterLevelAlerts = useCallback((data) => {
        if (!data || data.length === 0 || !warning) return;

        // Sort data by time
        const sortedData = [...data].sort((a, b) =>
            new Date(a.datetime) - new Date(b.datetime)
        );

        // Count how many points are above each threshold
        const warningLevel = parseFloat(warning);
        const dangerLevel = parseFloat(danger);
        const hflLevel = parseFloat(hfl);

        const countAboveHfl = hfl ? sortedData.filter(d => d.value >= hflLevel).length : 0;
        const countAboveDanger = danger ? sortedData.filter(d => d.value >= dangerLevel).length : 0;
        const countAboveWarning = warning ? sortedData.filter(d => d.value >= warningLevel).length : 0;

        const latestValue = sortedData[sortedData.length - 1]?.value;
        console.log(`[${chartId}] Checking alerts - Latest: ${latestValue}, Above HFL: ${countAboveHfl}, Above Danger: ${countAboveDanger}, Above Warning: ${countAboveWarning}`);

        // Only trigger if exactly 1 point crossed the threshold (first time crossing)
        if (latestValue !== null && latestValue !== undefined) {
            // Check HFL
            if (hfl && countAboveHfl === 1 && latestValue >= hflLevel && !hasTriggeredHfl) {
                console.log(`🔴 [${chartId}] HFL level crossed! Current: ${latestValue}, HFL: ${hflLevel}`);
                setHasTriggeredHfl(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
            // Check Danger
            else if (danger && countAboveDanger === 1 && latestValue >= dangerLevel && !hasTriggeredDanger && !hasTriggeredHfl) {
                console.log(`🚨 [${chartId}] Danger level crossed! Current: ${latestValue}, Danger: ${dangerLevel}`);
                setHasTriggeredDanger(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
            // Check Warning
            else if (warning && countAboveWarning === 1 && latestValue >= warningLevel && !hasTriggeredWarning && !hasTriggeredDanger && !hasTriggeredHfl) {
                console.log(`⚠️ [${chartId}] Warning level crossed! Current: ${latestValue}, Warning: ${warningLevel}`);
                setHasTriggeredWarning(true);
                if (onThresholdCrossed && chartId) {
                    onThresholdCrossed(chartId);
                }
            }
        }
    }, [warning, danger, hfl, hasTriggeredWarning, hasTriggeredDanger, hasTriggeredHfl, chartId, onThresholdCrossed]);

    useEffect(() => {
        updateChartHeight();
        window.addEventListener('resize', updateChartHeight);
        return () => window.removeEventListener('resize', updateChartHeight);
    }, []);

    // Process and check alerts when data changes
    useEffect(() => {
        if (dataToUse && dataToUse.length > 0) {
            const processedData = dataToUse
                .filter(entry => (entry.value !== null && entry.value !== undefined))
                .map(entry => ({
                    datetime: entry.datetime,
                    value: Number(entry.value)
                }));
            checkWaterLevelAlerts(processedData);
        }
    }, [dataToUse, checkWaterLevelAlerts]);

    if (!dataToUse || dataToUse.length === 0) {
        return (
            <div 
                className="w-full rounded-lg relative flex items-center justify-center" 
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
            >
                No data available for {title}.
            </div>
        );
    }

    // Process BD API data format for plotting
    const processedData = dataToUse
        .filter(entry => (entry.value !== null && entry.value !== undefined))
        .map(entry => ({
            datetime: convertToGMTPlus6(entry.datetime),
            value: Number(entry.value)
        }));

    const charData = [
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
            y: [warning, warning],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'yellow' },
            name: 'Warning',
        },
        {
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [danger, danger],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#FFCC00' },
            name: 'Danger',
        },
        {
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [hfl, hfl],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'red' },
            name: 'HFL',
        },
    ];

    const layout = {
        title: title,
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
                data={charData}
                layout={layout}
                style={{ height: chartHeight + 'px' }}
                config={config}
            />
        </div>
    );
};

export default TeestaLineChart;
