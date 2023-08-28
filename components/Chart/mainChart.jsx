"use client";

import {useEffect, useState} from "react";

import LineChartWithDangerLine from "@/components/Chart/lineChartWithDangerLine";
import DaliaChart from "@/components/Chart/DaliaChart";
import useSound from "use-sound";

const MainChart = (props) => {
    const {mikliGongStationData, daliaStationData, doaniaStationData, domohoniWaterLevelData} = props

    const [play, {stop}] = useSound("./mp3/loud_alarm.mp3");

    // Define state for sound playing
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);

    // Sound URL
    const soundUrl = "./mp3/loud_alarm.mp3";

    // // Function to check if the condition for playing sound is met
    // const shouldPlaySound = () => {
    //     // Check the condition for each chart's data
    //     const mikliGongData = mikliGongStationData.slice(-2); // Get last two data points
    //     const domohoniData = domohoniWaterLevelData.slice(-2); // Get last two data points
    //     const daliaData = daliaStationData.slice(-2); // Get last two data points
    //     const doaniaData = doaniaStationData.slice(-2); // Get last two data points
    //
    //     // Check if the last value is above HFL and the second last is not
    //     const mikliGongCondition =
    //         mikliGongData[1].dataValue > parseFloat(mikliGongData[1].hfl) &&
    //         mikliGongData[0].dataValue <= parseFloat(mikliGongData[0].hfl);
    //
    //     const domohoniCondition =
    //         domohoniData[1].dataValue > parseFloat(domohoniData[1].hfl) &&
    //         domohoniData[0].dataValue <= parseFloat(domohoniData[0].hfl);
    //
    //     const daliaCondition =
    //         daliaData[1].value > parseFloat(daliaData[1].hfl) &&
    //         daliaData[0].value <= parseFloat(daliaData[0].hfl);
    //
    //     const doaniaCondition =
    //         doaniaData[1].value > parseFloat(doaniaData[1].hfl) &&
    //         doaniaData[0].value <= parseFloat(doaniaData[0].hfl);
    //
    //     // Return true if any one of the conditions is met
    //     return (
    //         mikliGongCondition ||
    //         domohoniCondition ||
    //         daliaCondition ||
    //         doaniaCondition
    //     );
    // };
    //
    // let interval;
    //
    // // Play sound repeatedly when the condition is met
    // useEffect(() => {
    //     console.log("shouldPlaySound()", shouldPlaySound())
    //     // let interval;
    //
    //     // if (shouldPlaySound() && !isSoundPlaying) {
    //     if (!isSoundPlaying) {
    //         interval = setInterval(() => {
    //             play();
    //         }, 1000); // Adjust the interval as needed
    //         setIsSoundPlaying(true);
    //     } else if (!shouldPlaySound() && isSoundPlaying) {
    //         clearInterval(interval); // Stop playing the sound
    //         stop();
    //         setIsSoundPlaying(false);
    //     }
    //
    //     return () => {
    //         clearInterval(interval); // Clean up the interval on unmount
    //     };
    // }, [mikliGongStationData, domohoniWaterLevelData, daliaStationData, doaniaStationData, isSoundPlaying]);
    //
    // const [play, { stop }] = useSound(soundUrl);
    //
    // // Function to stop the sound manually
    // const stopSound = () => {
    //     clearInterval(interval); // Stop playing the sound
    //     stop();
    //     setIsSoundPlaying(false);
    // };

    return (
        <div className="w-full mx-5">
            <button onClick={() => stop()}>Stop</button>
            <div className='flex justify-between gap-2'>
                {/*<div className="rounded-lg shadow-lg w-full">*/}
                <LineChartWithDangerLine
                    data={mikliGongStationData}
                    title="Hydrograph view of - Mekhliganj (R/B)"
                    hfl="66.62"
                    danger="65.8"
                    warning="65.45"
                    paperColor="#fee2e2"
                    play={play}
                    stop={stop}
                />
                {/*</div>*/}

                {/*<div className="rounded-lg shadow-lg w-full">*/}
                <LineChartWithDangerLine
                    data={domohoniWaterLevelData}
                    title="Hydrograph view of - DOMOHANI"
                    hfl="89.3"
                    danger="85.95"
                    warning="85.65"
                    paperColor='#ffedd5'
                    play={play}
                    stop={stop}
                />
                {/*</div>*/}
            </div>
            <div className='flex justify-between gap-2'>
                {/*<div className="rounded-lg shadow-lg w-full">*/}
                <DaliaChart
                    data={daliaStationData}
                    title="Hydrograph view of - Dalia (SW291.5 R)"
                    hfl="50.00"
                    danger="53.8"
                    warning="48.45"
                    paperColor="#fef9c3"
                    play={play}
                    stop={stop}
                />
                {/*</div>*/}

                {/*<div className="rounded-lg shadow-lg w-full">*/}
                <DaliaChart
                    data={doaniaStationData}
                    title="Hydrograph view of - Doani (SW291.5 L)"
                    hfl="50.62"
                    danger="45.8"
                    warning="52.45"
                    paperColor='#ecfccb'
                    play={play}
                    stop={stop}
                />
                {/*</div>*/}
            </div>
        </div>
    )

}

export default MainChart