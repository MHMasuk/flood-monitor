"use client";

import React from 'react';
import Plot from 'react-plotly.js';

const ChartWithImages = () => {
    const data = [
        {
            x: [1, 2, 3],
            y: [1, 2, 3],
            type: 'scatter',
        },
    ];

    const layout = {
        images: [
            {
                source: 'https://images.plot.ly/language-icons/api-home/python-logo.png',
                xref: 'paper',
                yref: 'paper',
                x: 0,
                y: 1,
                sizex: 0.2,
                sizey: 0.2,
                xanchor: 'right',
                yanchor: 'bottom',
            },
            {
                source: 'https://images.plot.ly/language-icons/api-home/js-logo.png',
                xref: 'x',
                yref: 'y',
                x: 1.5,
                y: 2,
                sizex: 1,
                sizey: 1,
                xanchor: 'right',
                yanchor: 'bottom',
            },
            {
                source: 'https://aff.india-water.gov.in/image/DHUBRI.png',
                xref: 'x',
                yref: 'y',
                x: 1,
                y: 3,
                sizex: 2,
                sizey: 2,
                sizing: 'stretch',
                opacity: 0.4,
                layer: 'above',
            },
            {
                source: 'https://images.plot.ly/language-icons/api-home/matlab-logo.png',
                xref: 'x',
                yref: 'paper',
                x: 3,
                y: 0,
                sizex: 0.5,
                sizey: 1,
                opacity: 1,
                xanchor: 'right',
                yanchor: 'middle',
            },
        ],
    };

    return (
        <Plot
            data={[]}
            layout={layout}
            style={{ width: '100%', height: '400px' }}
        />
    );
};

export default ChartWithImages;