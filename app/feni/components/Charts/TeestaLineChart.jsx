"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from "next/dynamic";
import { convertToGMTPlus6 } from "@/utils/convertToUtc";
import { DUMMY_BD_STATION_DATA } from './dummyBdStationData';
import { useLanguage } from "@/app/context/LanguageContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const TeestaLineChart = ({
    chart_data,
    title,
    titleBn, // Bangla title (optional)
    hfl,
    danger,
    warning,
    paperColor,
    chartId = '',
    onThresholdCrossed = null,
    useDummyData = false
}) => {
    console.log("title", title)
    const { language } = useLanguage();
    const [chartHeight, setChartHeight] = useState(400);
    const [hasTriggeredWarning, setHasTriggeredWarning] = useState(false);
    const [hasTriggeredDanger, setHasTriggeredDanger] = useState(false);
    const [hasTriggeredHfl, setHasTriggeredHfl] = useState(false);

    const updateChartHeight = () => {
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        // Header (64px) + Footer (56px) + padding/margins = 120px reserved
        // Divide remaining space by number of rows (assuming 2 charts per row on desktop)
        const reservedSpace = 140; // Header + Footer + padding
        const availableHeight = screenHeight - reservedSpace;

        let desiredHeight;

        if (screenWidth < 1024) {
            // Mobile/Tablet: Stack vertically, so divide by number of charts
            desiredHeight = (availableHeight / 2) - 40; // -40 for gaps
        } else {
            // Desktop: 2 columns, so charts are side by side
            // If you have 4 charts (2 rows), divide by 2
            desiredHeight = (availableHeight / 2) - 40; // -40 for gaps between rows
        }

        // Set reasonable constraints
        const minHeight = 280;
        const maxHeight = 550;

        desiredHeight = Math.max(minHeight, Math.min(maxHeight, desiredHeight));

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
            name: 'Water Level',
            line: { color: 'green', width: 2 },
            marker: { size: 6, color: 'green' }
        }
    ];

    // Add warning line if exists
    if (warning) {
        charData.push({
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [warning, warning],
            type: 'scatter',
            mode: 'lines',
            name: 'Warning Level',
            line: { color: 'orange', width: 2, dash: 'dash' }
        });
    }

    // Add danger line if exists
    if (danger) {
        charData.push({
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [danger, danger],
            type: 'scatter',
            mode: 'lines',
            name: 'Danger Level',
            line: { color: 'red', width: 2, dash: 'dash' }
        });
    }

    // Add HFL line if exists
    if (hfl) {
        charData.push({
            x: [processedData[0]?.datetime, processedData[processedData.length - 1]?.datetime],
            y: [hfl, hfl],
            type: 'scatter',
            mode: 'lines',
            name: 'HFL',
            line: { color: 'darkred', width: 2, dash: 'dot' }
        });
    }

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
            showgrid: true,
            automargin: true
        },
        paper_bgcolor: paperColor,
        plot_bgcolor: '#ffffff',
        margin: { l: 55, r: 20, t: 50, b: 60 },
        height: chartHeight,
        showlegend: true,
        legend: {
            orientation: 'h',
            y: -0.25,
            x: 0.5,
            xanchor: 'center',
            yanchor: 'top'
        },
        autosize: true
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        displaylogo: false,
        useResizeHandler: true
    };

    return (
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <Plot
                data={charData}
                layout={layout}
                config={config}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler={true}
            />
        </div>
    );
};

export default TeestaLineChart;
