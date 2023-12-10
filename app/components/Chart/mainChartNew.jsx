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

    console.log("data mikliGongStationData, daliaStationData, doaniaStationData, domohoniWaterLevelData", mikliGongStationData.length, daliaStationData.length, doaniaStationData.length, domohoniWaterLevelData.length)

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
        // Check the condition for each chart's data
        const mikliGongData = mikliGongStationData.slice(-2); // Get last two data points
        const domohoniData = domohoniWaterLevelData.slice(-2); // Get last two data points
        const daliaData = daliaStationData.slice(-2); // Get last two data points
        const doaniaData = doaniaStationData.slice(-2); // Get last two data points

        // Check if the last value is above HFL and the second last is not
        // const mikliGongCondition =
        //     mikliGongData[1].dataValue > 66.62 &&
        //     mikliGongData[0].dataValue <= 66.62 ||
        //     mikliGongData[1].dataValue > 65.8 &&
        //     mikliGongData[1].dataValue <= 65.8;

        const mikliGongCondition =
            (mikliGongData[1].dataValue > 65.8 &&
            mikliGongData[0].dataValue <= 65.8) ||
            (mikliGongData[1].dataValue > 66.62 &&
            mikliGongData[0].dataValue <= 66.62);


        // console.log("mikliGongData[0].dataValue, mikliGongData[1].dataValue", mikliGongData[0].dataValue, mikliGongData[1].dataValue)

        if (mikliGongCondition) {
            setMikligongAnimation(true)
        }

        const domohoniCondition =
            domohoniData[1].dataValue > 89.3 &&
            domohoniData[0].dataValue <= 89.3;

        if (domohoniCondition) {
            setDomohoniAnimation(true)
        }

        const daliaCondition =
            doaniaData[1].value > 51.75 &&
            doaniaData[0].value <= 51.75 ||
            doaniaData[1].value > 52.15 &&
            doaniaData[0].value <= 52.15 ||
            doaniaData[1].value > 52.84 &&
            doaniaData[0].value <= 52.84;

        // const daliaCondition =
        //     daliaData[1].value > 51.75 &&
        //     daliaData[0].value <= 51.75;

        if (daliaCondition) {
            setDaliaAnimation(true)
        }

        const doaniaCondition =
            doaniaData[1].value > 51.75 &&
            doaniaData[0].value <= 51.75 ||
            doaniaData[1].value > 52.15 &&
            doaniaData[0].value <= 52.15 ||
            doaniaData[1].value > 52.84 &&
            doaniaData[0].value <= 52.84;

        if (doaniaCondition) {
            setDoaniaAnimation(true)
        }

        // const productCondition =
        //     productDataNew[1].value > 52.84 &&
        //     productDataNew[0].value <= 52.84;
        //
        // if (productCondition) {
        //     setPAnimation(true)
        // }

        console.log("mikliGongCondition, domohoniCondition, daliaCondition, doaniaCondition", mikliGongCondition, domohoniCondition, daliaCondition, doaniaCondition)

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
            // setIsSoundPlaying(true);
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
        mikliGongStationData,
        domohoniWaterLevelData,
        daliaStationData,
        doaniaStationData,
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

    return (
    <div className="w-full mx-5">
        <div className="fixed z-50 bg-red-700 right-0 top-[50%] bottom-[50%]">
            <div className="tooltip" data-tip="Stop The Alarm">
                <button className="btn btn-sm btn-error" onClick={handleStop}>
                    <svg className="swap-off h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
                    Stop
                </button>
            </div>
        </div>
        <div className='flex gap-2 mb-1'>
            <div className={`w-full ${mikligongAnimation ? 'animate-pulse' : ''}`}>
                <LineChartWithDangerLine
                    chart_data={mikliGongStationData}
                    title="Hydrograph view of - Mekhliganj (R/B)"
                    hfl="66.62"
                    danger="65.8"
                    warning="65.45"
                    paperColor="#fee2e2"
                />
            </div>

            <div className={`w-full ${domohoniAnimation ? 'animate-pulse' : ''}`}>
                <LineChartWithDangerLine
                    chart_data={domohoniWaterLevelData}
                    title="Hydrograph view of - DOMOHANI"
                    hfl="89.3"
                    danger="85.95"
                    warning="85.65"
                    paperColor='#ffedd5'
                />
            </div>
        </div>
        <div className='flex gap-2'>
            <div className={`w-full ${daliaAnimation ? 'animate-pulse' : ''}`}>
                <DaliaChartDemo
                    chart_data={daliaStationData}
                    title="Hydrograph view of - Dalia (SW291.5 R)"
                    hfl="52.84"
                    danger="52.15"
                    warning="51.75"
                    paperColor="#fef9c3"
                />
            </div>

            <div className={`w-full ${doaniaAnimation ? 'animate-pulse' : ''}`}>
                <DoaniaChart
                    chart_data={doaniaStationData}
                    title="Hydrograph view of - Doani (SW291.5 L)"
                    hfl="52.84"
                    danger="52.15"
                    warning="51.75"
                    paperColor='#ecfccb'
                />
            </div>
        </div>
    </div>
    );
};

export default MainChartNew;