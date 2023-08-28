"use client";

import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';


const ChartWithaudio = ({data, title, hfl, danger, warning}) => {
    const [chartHeight, setChartHeight] = useState(290); // Default chart height
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    // Function to update the chart height based on screen size
    const updateChartHeight = () => {
        const screenHeight = window.innerHeight;
        const desiredHeight = screenHeight * 0.4; // Adjust this value as needed
        setChartHeight(desiredHeight);
    };

    useEffect(() => {
        // Set the initial chart height and add a resize event listener
        updateChartHeight();
        window.addEventListener('resize', updateChartHeight);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateChartHeight);
        };
    }, []); // Empty dependency array to run this effect once

    const charData = [
        {
            x: data.map(item => item.id.dataTime),
            y: data.map(item => item.dataValue),
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: 'green',},
            name: 'Measured Water Level',
        },
        {
            x: [data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [warning, warning], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: 'yellow'},
            name: 'Warning',
        },
        {
            x: [data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [danger, danger], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: '#FFCC00'},
            name: 'Danger',
        },
        {
            x: [data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [hfl, hfl], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: 'red'},
            name: 'HFL',
        },
        // Add a trace for the warning when line is above HFL
        // {
        //     x: data.map(item => item.id.dataTime),
        //     y: data.map(item => item.dataValue > 65.62 ? item.dataValue : null), // Null values where no warning
        //     type: 'scatter',
        //     mode: 'markers',
        //     marker: { color: 'red', size: 8, symbol: 'triangle-up' },
        //     name: 'Above HFL',
        // },
    ];

    const layout = {
        title: title,
        xaxis: {
            title: 'Date and Time',
            tickangle: -45
        },
        yaxis: {title: 'Water Level (m)'},
        legend: {
            // x: 0.3,
            y: 1.15,
            orientation: 'h',
        },
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    }

    useEffect(() => {
        if (data.length > 0 && data[data.length - 1].dataValue > hfl && !isPlaying) {
            // Play the alarm sound continuously when the last data point is above HFL
            audioRef.current.play();
            setIsPlaying(true);
        } else if (isPlaying && (data.length === 0 || data[data.length - 1].dataValue <= hfl)) {
            // Stop the alarm sound if the last point is no longer above HFL
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset audio playback to start
            setIsPlaying(false);
        }
    }, [data, hfl, isPlaying]);

    return (
        <div>
            <Plot
                data={charData}
                layout={layout}
                style={{
                    width: "100%",
                    height: chartHeight + 'px'
                }}
                config={config}
            />

            <audio ref={audioRef} loop>
                <source src="./mp3/loud_alarm.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/*{isPlaying ? (*/}
            {/*    <button onClick={() => setIsPlaying(false)}>*/}
            {/*        Turn Off Sound*/}
            {/*    </button>*/}
            {/*) : (*/}
            {/*    <audio ref={audioRef} loop>*/}
            {/*        <source src="./mp3/loud_alarm.mp3" type="audio/mpeg" />*/}
            {/*        Your browser does not support the audio element.*/}
            {/*    </audio>*/}
            {/*)}*/}
        </div>
    );
};

export default ChartWithaudio;