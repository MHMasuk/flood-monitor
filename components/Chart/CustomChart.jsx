"use client";

import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js/dist/plotly'; // Import Plotly library
// import './LineChartWithDangerLine.css'; // Import the CSS file with responsive styles

const CustomChart = ({data}) => {
    const charData = [
        {
            x: data.map(item =>item.id.dataTime),
            y: data.map(item => item.dataValue),
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'green',
                width: 3
            },
            name: 'Measured Water Level',
        },
        {
            x: [ data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [65.45, 65.45], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'yellow',
                width: 3
            },
            name: 'Warning',
        },
        {
            x: [ data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [65.8, 65.8], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: '#FFCC00',
                width: 3
            },
            name: 'Danger',
        },
        {
            x: [ data[0].id.dataTime, data[data.length - 1].id.dataTime],
            y: [66.62, 66.62], // Danger line y-values
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'red',
                width: 3
            },
            name: 'HFL',
        },
    ];


    const layout = {
        title: 'Hydrograph view of - Mekhliganj (R/B)',
        xaxis: {
            title: 'Date/Time',
            tickangle: -45,
        },
        yaxis: { title: 'Water Level (m)' },
        font: { size: 12 },
        legend: {
            x: 0.3,
            y: 1.15,
            orientation: 'h',
        },
    };



    useEffect(() => {
        const chartDiv = document.getElementById('chartDiv'); // Use the id of your container div
        const plot = Plotly.newPlot(
            chartDiv,
            charData,
            layout,
            {
                responsive: true,
                displayModeBar: false
            }
    );

        // Add the ModeBar on the top of the chart
        const modeBar = chartDiv.querySelector('.js-plotly-plot .modebar-container');
        modeBar.style.top = '5px'; // Adjust the top position as needed

        // Return a cleanup function to remove the Plotly chart when the component unmounts
        return () => {
            Plotly.purge(chartDiv);
        };
    }, []); // Empty dependency array to ensure the effect runs only once

    return <div id="chartDiv" className="chart-container" style={{ height: '270px' }} />; // Render an empty div for the chart
};

export default CustomChart;