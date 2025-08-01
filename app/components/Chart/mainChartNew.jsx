"use client";

import React, { useEffect, useState, useRef } from "react";
import LineChartWithDangerLine from "@/app/components/Chart/lineChartWithDangerLine";
import useSound from "use-sound";
import DaliaChartDemo from "@/app/components/Chart/DaliaChatDemo";
import DoaniaChart from "@/app/components/Chart/DoaniaChart";
import ProductChart from "@/app/components/Chart/ProductChart";

const MainChartNew = (props) => {
    const {
        mikliGongStationData,
        daliaStationData,
        doaniaStationData,
        domohoniWaterLevelData,
        productData
    } = props;

    // Add null checks and default to empty arrays
    const safeMikliGongData = mikliGongStationData || [];
    const safeDaliaData = daliaStationData || [];
    const safeDoaniaData = doaniaStationData || [];
    const safeDomohoniData = domohoniWaterLevelData || [];
    const safeProductData = productData || [];

    console.log("data lengths:", {
        mikliGong: safeMikliGongData.length,
        dalia: safeDaliaData.length,
        doania: safeDoaniaData.length,
        domohoni: safeDomohoniData.length
    });

    const [play, { stop }] = useSound("./mp3/loud_alarm.mp3");

    // Define state for sound playing
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);

    // animation state
    const [domohoniAnimation, setDomohoniAnimation] = useState(false)
    const [mikligongAnimation, setMikligongAnimation] = useState(false)
    const [doaniaAnimation, setDoaniaAnimation] = useState(false)
    const [daliaAnimation, setDaliaAnimation] = useState(false)

    // Create a ref to store the interval
    const intervalRefSound = useRef(null);

    // Function to check if the condition for playing sound is met
    const shouldPlaySound = () => {
        // Check if we have enough data points (at least 2) for each dataset
        if (safeMikliGongData.length < 2 ||
            safeDomohoniData.length < 2 ||
            safeDaliaData.length < 2 ||
            safeDoaniaData.length < 2) {
            return false;
        }

        // Get last two data points safely
        const mikliGongData = safeMikliGongData.slice(-2);
        const domohoniData = safeDomohoniData.slice(-2);
        const daliaData = safeDaliaData.slice(-2);
        const doaniaData = safeDoaniaData.slice(-2);

        // Check conditions with additional null checks
        const mikliGongCondition =
            mikliGongData[1]?.dataValue > 65.45 &&
            mikliGongData[0]?.dataValue <= 65.45;

        if (mikliGongCondition) {
            setMikligongAnimation(true)
        }

        const domohoniCondition =
            domohoniData[1]?.dataValue > 85.65 &&
            domohoniData[0]?.dataValue <= 85.65;

        if (domohoniCondition) {
            setDomohoniAnimation(true)
        }

        const daliaCondition =
            daliaData[1]?.value > 51.75 &&
            daliaData[0]?.value <= 51.75;

        if (daliaCondition) {
            setDaliaAnimation(true)
        }

        const doaniaCondition =
            doaniaData[1]?.value > 51.75 &&
            doaniaData[0]?.value <= 51.75;

        if (doaniaCondition) {
            setDoaniaAnimation(true)
        }

        console.log("Conditions:", {
            mikliGong: mikliGongCondition,
            domohoni: domohoniCondition,
            dalia: daliaCondition,
            doania: doaniaCondition
        });

        // Return true if any one of the conditions is met
        return (
            mikliGongCondition ||
            domohoniCondition ||
            daliaCondition ||
            doaniaCondition
        );
    };

    // Play sound repeatedly when the condition is met
    useEffect(() => {
        // Clear the previous interval if it exists
        clearInterval(intervalRefSound.current);

        if (shouldPlaySound() && !isSoundPlaying) {
            // Start playing the sound repeatedly
            intervalRefSound.current = setInterval(() => {
                play();
            }, 6000); // Adjust the interval as needed
            setIsSoundPlaying(true);
        } else if (!shouldPlaySound() && isSoundPlaying) {
            // Stop playing the sound if the condition is no longer met
            clearInterval(intervalRefSound.current);
            stop();
            setIsSoundPlaying(false);
        }

        // Clean up the interval on unmount
        return () => {
            clearInterval(intervalRefSound.current);
        };
    }, [
        safeMikliGongData,
        safeDomohoniData,
        safeDaliaData,
        safeDoaniaData,
        isSoundPlaying,
        play,
        stop,
    ]);

    const handleStop = () => {
        stop();
        setIsSoundPlaying(false);

        // Clear the interval when the "Stop" button is clicked
        clearInterval(intervalRefSound.current);

        setDoaniaAnimation(false);
        setMikligongAnimation(false);
        setDomohoniAnimation(false);
        setDaliaAnimation(false);
    };

    // Show loading state if critical data is not available
    if (!safeMikliGongData.length && !safeDomohoniData.length &&
        !safeDaliaData.length && !safeDoaniaData.length) {
        return (
            <div className="w-full mx-5 flex items-center justify-center h-64">
                <div className="text-center bg-white p-8 rounded-lg border border-gray-200">
                    <div className="loading loading-spinner loading-lg"></div>
                    <p className="mt-4 text-gray-600">Loading chart data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-5">
            <div className="fixed z-50 bg-red-700 right-0 top-[50%] bottom-[50%]">
                <div className="tooltip" data-tip="Stop The Alarm">
                    <button className="btn btn-sm btn-error" onClick={handleStop}>
                        <svg className="swap-off h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                            <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/>
                        </svg>
                        Stop
                    </button>
                </div>
            </div>
            <div className='flex gap-2 mb-1'>
                <div className={`w-full ${mikligongAnimation ? 'animate-pulse' : ''}`}>
                    {safeMikliGongData.length > 0 ? (
                        <LineChartWithDangerLine
                            chart_data={safeMikliGongData}
                            title="Hydrograph view of - Mekhliganj (R/B)"
                            hfl="66.62"
                            danger="65.8"
                            warning="65.45"
                            paperColor="#fee2e2"
                        />
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white">
                            <p className="text-gray-500">No data available for Mekhliganj</p>
                        </div>
                    )}
                </div>

                <div className={`w-full ${domohoniAnimation ? 'animate-pulse' : ''}`}>
                    {safeDomohoniData.length > 0 ? (
                        <LineChartWithDangerLine
                            chart_data={safeDomohoniData}
                            title="Hydrograph view of - DOMOHANI"
                            hfl="89.3"
                            danger="85.95"
                            warning="85.65"
                            paperColor='#ffedd5'
                        />
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white">
                            <p className="text-gray-500">No data available for Domohani</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex gap-2'>
                <div className={`w-full ${daliaAnimation ? 'animate-pulse' : ''}`}>
                    {safeDaliaData.length > 0 ? (
                        <DaliaChartDemo
                            chart_data={safeDaliaData}
                            title="Hydrograph view of - Dalia (SW291.5 R)"
                            hfl="52.84"
                            danger="52.15"
                            warning="51.75"
                            paperColor="#fef9c3"
                        />
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white">
                            <p className="text-gray-500">No data available for Dalia</p>
                        </div>
                    )}
                </div>

                <div className={`w-full ${doaniaAnimation ? 'animate-pulse' : ''}`}>
                    {safeDoaniaData.length > 0 ? (
                        <DoaniaChart
                            chart_data={safeDoaniaData}
                            title="Hydrograph view of - Doani (SW291.5 L)"
                            hfl="52.84"
                            danger="52.15"
                            warning="51.75"
                            paperColor='#ecfccb'
                        />
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-white">
                            <p className="text-gray-500">No data available for Doani</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainChartNew;