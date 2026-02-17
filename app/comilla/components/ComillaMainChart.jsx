"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import useSound from "use-sound";
import ComillaLineChart from "./Charts/ComillaLineChart";
import FfwcIndiaLineChart from "./Charts/FfwcIndiaLineChart";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import { DUMMY_BD_STATION_DATA } from "./Charts/dummyBdStationData";

const ComillaMainChart = (props) => {
    const { indiaStationConfigs, bdStationConfigs, useDummyData = false } = props;
    const safeBdStationConfigs = React.useMemo(() => bdStationConfigs || [], [bdStationConfigs]);
    const safeIndiaStationConfigs = React.useMemo(() => indiaStationConfigs || [], [indiaStationConfigs]);

    const [play, { stop }] = useSound("./mp3/loud_alarm.mp3");
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const [audioUnlocked, setAudioUnlocked] = useState(false);
    const [pendingAlarm, setPendingAlarm] = useState(false);
    const intervalRefSound = useRef(null);

    // State for BD station data - stores data for each series_id
    const [bdStationDataMap, setBdStationDataMap] = useState({});

    // Track which charts have crossed thresholds (for animation)
    const [alertedCharts, setAlertedCharts] = useState(new Set());

    // Track if alarm has been triggered (to prevent re-triggering)
    const [alarmTriggered, setAlarmTriggered] = useState(false);

    // Unlock audio (must be called from user interaction)
    const unlockAudioAndPlay = () => {
        setAudioUnlocked(true);
        // If there's a pending alarm, start it immediately
        if (pendingAlarm) {
            startCentralAlarm();
        }
    };

    // Start central alarm sound (plays in loop)
    const startCentralAlarm = useCallback(() => {
        if (isSoundPlaying) return;

        console.log('🔊 Starting central alarm...');
        intervalRefSound.current = setInterval(() => {
            play();
        }, 6000);
        play(); // Play immediately
        setIsSoundPlaying(true);
        setAlarmTriggered(true);
    }, [isSoundPlaying, play]);

    // Stop central alarm
    const stopCentralAlarm = () => {
        console.log('🔇 Stopping central alarm...');
        stop();
        setIsSoundPlaying(false);
        clearInterval(intervalRefSound.current);
    };

    // Called by child charts when threshold is crossed
    const onThresholdCrossed = useCallback((chartId) => {
        console.log(`⚠️ Threshold crossed for chart: ${chartId}`);

        setAlertedCharts(prev => {
            const newSet = new Set(prev);
            newSet.add(chartId);
            return newSet;
        });

        // Trigger alarm if not already triggered
        if (!alarmTriggered) {
            if (audioUnlocked) {
                startCentralAlarm();
            } else {
                setPendingAlarm(true);
            }
        }
    }, [alarmTriggered, audioUnlocked, startCentralAlarm]);

    // Fetch BD station data for all configs
    const fetchBdStationData = useCallback(async () => {
        if (!safeBdStationConfigs.length) return;

        // Use dummy data if useDummyData is true
        if (useDummyData) {
            const newDataMap = {};
            safeBdStationConfigs.forEach(config => {
                // Use the same dummy data for all BD stations
                newDataMap[config.series_id] = DUMMY_BD_STATION_DATA;
            });
            setBdStationDataMap(newDataMap);
            return;
        }

        try {
            const tokenData = await fetchTokenIfExpired();

            // Fetch data for each BD station config
            const fetchPromises = safeBdStationConfigs.map(async (config) => {
                try {
                    const response = await fetch(`/api/bd-station/${config.series_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Custom-Token': `${tokenData}`,
                        },
                    });

                    const result = await response.json();
                    return { seriesId: config.series_id, data: result.data || [] };
                } catch (error) {
                    console.error(`Error fetching BD station ${config.series_id}:`, error);
                    return { seriesId: config.series_id, data: [] };
                }
            });

            const results = await Promise.all(fetchPromises);

            // Update state with all fetched data
            const newDataMap = {};
            results.forEach(result => {
                newDataMap[result.seriesId] = result.data;
            });
            setBdStationDataMap(newDataMap);
        } catch (error) {
            console.error('Error fetching BD station data:', error);
        }
    }, [safeBdStationConfigs, useDummyData]);

    // Fetch BD station data on mount
    useEffect(() => {
        fetchBdStationData();
    }, [fetchBdStationData]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearInterval(intervalRefSound.current);
        };
    }, []);

    // Show loading state if no configs
    if (!safeBdStationConfigs.length && !safeIndiaStationConfigs.length) {
        return (
            <div className="w-full px-5 flex items-center justify-center h-64">
                <div className="text-center bg-white p-8 rounded-lg border border-gray-200">
                    <div className="loading loading-spinner loading-lg"></div>
                    <p className="mt-4 text-gray-600">Loading chart data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-5 py-2">
            {/* Central alarm control */}
            <div className="fixed z-50 right-4 top-[50%] -translate-y-1/2 flex flex-col gap-2">
                {/* Enable Audio button - shows when audio is not unlocked */}
                {!audioUnlocked && !isSoundPlaying && (
                    <div className="tooltip tooltip-left" data-tip="Enable Alarm">
                        <button
                            onClick={unlockAudioAndPlay}
                            className={`btn btn-sm btn-primary ${pendingAlarm ? 'animate-bounce' : ''}`}
                        >
                            🔔 Enable Alarm
                        </button>
                    </div>
                )}

                {/* Stop Alarm button - shows when alarm is playing */}
                {isSoundPlaying && (
                    <div className="tooltip tooltip-left" data-tip="Stop The Alarm">
                        <button className="btn btn-sm btn-error" onClick={stopCentralAlarm}>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                                <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/>
                            </svg>
                            Stop
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-4 justify-start">
                {/* Render FfwcIndiaLineChart for each India station config */}
                {safeIndiaStationConfigs.map((config, index) => {
                    const chartId = `india-${config.stationCode}`;
                    const isAlerting = alertedCharts.has(chartId) && isSoundPlaying;
                    const totalCharts = safeIndiaStationConfigs.length + safeBdStationConfigs.length;
                    const isLastChart = (index === safeIndiaStationConfigs.length - 1) && safeBdStationConfigs.length === 0;
                    const shouldCenter = totalCharts % 2 === 1 && isLastChart;

                    return (
                        <div key={config.stationCode} className={`w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] ${isAlerting ? 'animate-pulse' : ''} ${shouldCenter ? 'md:mx-auto' : ''}`}>
                            <FfwcIndiaLineChart
                                stationCode={config.stationCode}
                                stationName={config.name}
                                paperColor="#fef9c3"
                                chartId={chartId}
                                onThresholdCrossed={onThresholdCrossed}
                            />
                        </div>
                    );
                })}

                {/* Render ComillaLineChart for each BD station config */}
                {safeBdStationConfigs.map((config, index) => {
                    const chartData = bdStationDataMap[config.series_id] || [];
                    const chartId = `bd-${config.series_id}`;
                    const isAlerting = alertedCharts.has(chartId) && isSoundPlaying;
                    const totalCharts = safeIndiaStationConfigs.length + safeBdStationConfigs.length;
                    const isLastChart = index === safeBdStationConfigs.length - 1;
                    const shouldCenter = totalCharts % 2 === 1 && isLastChart;

                    return (
                        <div key={config.series_id} className={`w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] ${isAlerting ? 'animate-pulse' : ''} ${shouldCenter ? 'md:mx-auto' : ''}`}>
                            {chartData.length > 0 ? (
                                <ComillaLineChart
                                    chart_data={chartData}
                                    title={`Hydrograph view of - ${config.name}`}
                                    danger={config.danger}
                                    warning={config.warning}
                                    hfl={config.hfl}
                                    paperColor="#fef9c3"
                                    chartId={chartId}
                                    onThresholdCrossed={onThresholdCrossed}
                                    useDummyData={useDummyData}
                                />
                            ) : (
                                <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white">
                                    <div className="text-center">
                                        <div className="loading loading-spinner loading-md"></div>
                                        <p className="text-gray-500 mt-2">Loading {config.name}...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ComillaMainChart;
