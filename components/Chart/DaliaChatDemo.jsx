"use client";

import React, {useEffect, useState} from 'react';

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const DaliaChartDemo = ({data, title, hfl, danger, warning, paperColor}) => {
    const [chartHeight, setChartHeight] = useState(270); // Default chart height

    // console.log("data", data)

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
            x: data.map(item => item.datetime),
            y: data.map(item => item.value),
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: 'green',},
            name: 'Measured Water Level',
        },
        {
            x: [data[0].datetime, data[data.length - 1].datetime],
            y: [warning, warning], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: 'yellow'},
            name: 'Warning',
        },
        {
            x: [data[0].datetime, data[data.length - 1].datetime],
            y: [danger, danger], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {color: '#FFCC00'},
            name: 'Danger',
        },
        {
            x: [data[0].datetime, data[data.length - 1].datetime],
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
            // title: 'Date and Time',
            tickangle: -45,
            tickformat: '%d %b-%H:%M' // Format for date and time
        },
        yaxis: {title: 'Water Level (m)'},
        legend: {
            // x: 0.3,
            y: 1.25,
            orientation: 'h',
        },
        paper_bgcolor: paperColor
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    }



    return (
        <div className="w-full rounded-lg relative">
            <Plot
                data={charData}
                layout={layout}
                style={{
                    height: chartHeight + 'px'
                }}
                config={config}
            />
        </div>
    );
};

export default DaliaChartDemo;