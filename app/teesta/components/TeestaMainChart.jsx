"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import useSound from "use-sound";
import TeestaLineChart from "./Charts/TeestaLineChart";
import IndiaSiteLineChart from "@/app/components/Chart/IndiaSiteLineChart";
import { fetchTokenIfExpired } from "@/utils/jwtToken";
import { DUMMY_BD_STATION_DATA } from "./Charts/dummyBdStationData";

const TeestaMainChart = (props) => {
    const { indiaStationConfigs, bdStationConfigs, useDummyData = false, refreshInterval = 15, onRefreshIntervalChange } = props;
    const safeBdStationConfigs = React.useMemo(() => bdStationConfigs || [], [bdStationConfigs]);
    const safeIndiaStationConfigs = React.useMemo(() => indiaStationConfigs || [], [indiaStationConfigs]);

    const [play, { stop }] = useSound("./mp3/loud_alarm.mp3");
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const [audioUnlocked, setAudioUnlocked] = useState(false);
    const [pendingAlarm, setPendingAlarm] = useState(false);
    const intervalRefSound = useRef(null);
    const intervalRefBdData = useRef(null);
    const intervalRefCountdown = useRef(null);

    // State for countdown timer
    const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(refreshInterval * 60);
    const [lastRefreshTime, setLastRefreshTime] = useState(new Date());

    // State for BD station data - stores data for each series_id
    const [bdStationDataMap, setBdStationDataMap] = useState({});

    // Track which charts have crossed thresholds (for animation)
    const [alertedCharts, setAlertedCharts] = useState(new Set());

    // Track if alarm has been triggered (to prevent re-triggering)
    const [alarmTriggered, setAlarmTriggered] = useState(false);

    // Unlock audio (must be called from user interaction)
    const unlockAudioAndPlay = () => {
        setAudioUnlocked(true);
        startCentralAlarm();
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

        // Update last refresh time
        setLastRefreshTime(new Date());
        setSecondsUntilRefresh(refreshInterval * 60);

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
    }, [safeBdStationConfigs, useDummyData, refreshInterval]);

    // Fetch BD station data on mount and set up interval
    useEffect(() => {
        fetchBdStationData();

        // Clear any existing interval
        if (intervalRefBdData.current) {
            clearInterval(intervalRefBdData.current);
        }

        // Refresh BD station data based on refreshInterval
        intervalRefBdData.current = setInterval(() => {
            fetchBdStationData();
        }, refreshInterval * 60 * 1000);

        return () => {
            if (intervalRefBdData.current) {
                clearInterval(intervalRefBdData.current);
            }
        };
    }, [fetchBdStationData, refreshInterval]); // Re-run when refreshInterval changes

    // Countdown timer effect
    useEffect(() => {
        // Reset countdown when refreshInterval changes
        setSecondsUntilRefresh(refreshInterval * 60);

        // Clear existing countdown interval
        if (intervalRefCountdown.current) {
            clearInterval(intervalRefCountdown.current);
        }

        // Start countdown
        intervalRefCountdown.current = setInterval(() => {
            setSecondsUntilRefresh(prev => {
                if (prev <= 1) {
                    return refreshInterval * 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRefCountdown.current) {
                clearInterval(intervalRefCountdown.current);
            }
        };
    }, [refreshInterval]);

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
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Central alarm control */}
            <div className="fixed z-50 right-4 top-[50%] -translate-y-1/2 flex flex-col gap-2">
                {/* Enable Audio button - shows when there's a pending alarm but audio not unlocked */}
                {pendingAlarm && !audioUnlocked && !isSoundPlaying && (
                    <button
                        onClick={unlockAudioAndPlay}
                        className="btn btn-sm btn-primary animate-bounce"
                    >
                        🔔 Enable Alarm
                    </button>
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

                {/* Refresh Interval Control */}
                {onRefreshIntervalChange && (
                    <div className="tooltip tooltip-left" data-tip="Set Auto-Refresh Interval">
                        <div className="dropdown dropdown-left">
                            <label tabIndex={0} className="btn btn-sm btn-info">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="ml-1">{refreshInterval}m</span>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="menu-title"><span>Auto-Refresh Interval</span></li>
                                <li><a onClick={() => onRefreshIntervalChange(1)}>1 minute</a></li>
                                <li><a onClick={() => onRefreshIntervalChange(5)}>5 minutes</a></li>
                                <li><a onClick={() => onRefreshIntervalChange(10)}>10 minutes</a></li>
                                <li><a onClick={() => onRefreshIntervalChange(15)}>15 minutes (Default)</a></li>
                                <li><a onClick={() => onRefreshIntervalChange(30)}>30 minutes</a></li>
                                <li><a onClick={() => onRefreshIntervalChange(60)}>60 minutes</a></li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Manual Refresh Button with Countdown */}
                <div className="tooltip tooltip-left" data-tip="Manual Refresh">
                    <button
                        className="btn btn-sm btn-success flex flex-col items-center py-1 h-auto min-h-[3rem]"
                        onClick={() => fetchBdStationData()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="text-[10px] mt-1">
                            {Math.floor(secondsUntilRefresh / 60)}:{String(secondsUntilRefresh % 60).padStart(2, '0')}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-4 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Render TeestaLineChart for each BD station config */}
                {safeBdStationConfigs.map((config, index) => {
                    const chartData = bdStationDataMap[config.series_id] || [];
                    const chartId = `bd-${config.series_id}`;
                    const isAlerting = alertedCharts.has(chartId) && isSoundPlaying;
                    const totalCharts = safeBdStationConfigs.length + safeIndiaStationConfigs.length;
                    const isLastChart = (index === safeBdStationConfigs.length - 1) && safeIndiaStationConfigs.length === 0;
                    const shouldCenter = totalCharts % 2 === 1 && isLastChart;

                    return (
                        <div key={config.series_id} className={`w-full h-full ${isAlerting ? 'animate-pulse' : ''} ${shouldCenter ? 'lg:col-span-2 lg:mx-auto lg:max-w-[50%]' : ''}`}>
                            {chartData.length > 0 ? (
                                <TeestaLineChart
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

                {/* Render IndiaSiteLineChart for each India station config */}
                {safeIndiaStationConfigs.map((config, index) => {
                    const chartId = `india-${config.stationCode}`;
                    const isAlerting = alertedCharts.has(chartId) && isSoundPlaying;
                    const totalCharts = safeBdStationConfigs.length + safeIndiaStationConfigs.length;
                    const isLastChart = index === safeIndiaStationConfigs.length - 1;
                    const shouldCenter = totalCharts % 2 === 1 && isLastChart;

                    return (
                        <div key={config.stationCode} className={`w-full h-full ${isAlerting ? 'animate-pulse' : ''} ${shouldCenter ? 'lg:col-span-2 lg:mx-auto lg:max-w-[50%]' : ''}`}>
                            <IndiaSiteLineChart
                                stationCode={config.stationCode}
                                paperColor="#fef9c3"
                                useDummyData={useDummyData}
                                chartId={chartId}
                                onThresholdCrossed={onThresholdCrossed}
                                refreshInterval={refreshInterval}
                            />
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
    );
};

export default TeestaMainChart;
