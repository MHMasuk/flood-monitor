"use client";

import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';

import dynamic from "next/dynamic";
import {convertToGMTPlus6, convertToGMTPlus6And24Hours, getCurrentTimeIn24HoursFormat} from "@/utils/convertToUtc";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

import { DateTime } from 'luxon'

const DoaniaChart = ({chart_data, title, hfl, danger, warning, paperColor}) => {
    const [chartHeight, setChartHeight] = useState(270); // Default chart height

    // Convert datetime values in the data array to GMT+6
    const data = chart_data
        .filter(entry => entry.value >= 0)  // Remove entries with negative values
        .map(entry => {
            return {
                "datetime": convertToGMTPlus6(entry.datetime),
                "value": entry.value
            };
        });

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
    }, []);


    // Check if chart_data is empty
    if (!chart_data || chart_data.length === 0) {
        return (
            <div className="w-full rounded-lg relative flex items-center justify-center" style={{ height: chartHeight + 'px', backgroundColor: paperColor}}>
                No data available for {title}.
            </div>
        );
    }


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
            tickmode: 'linear',
            tickformat: '%d %b %Y', // Show full date and time
            // tickangle: -45, // Rotate labels to prevent overlap
            automargin: true, // Automatically adjust margins for rotated labels
            nticks: 10, // Limit number of ticks to prevent overcrowding
            tickfont: {
                size: 10 // Smaller font size for better fit
            }
        },
        yaxis: {title: 'Water Level (m)'},
        legend: {
            // x: 0.3,
            // y: 2.00,
            orientation: 'h',
        },
        paper_bgcolor: paperColor,
        margin: {
            l: 60,  // Adjust the left margin (in pixels)
            r: 60,  // Adjust the right margin (in pixels)
            t: 40,  // Adjust the top margin (in pixels)
            b: 40,  // Adjust the bottom margin (in pixels)
        },
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

export default DoaniaChart;