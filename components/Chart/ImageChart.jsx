"use client";

import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

const ChartWithImage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Check if the image URL is accessible
        const img = new Image();
        img.src = 'https://aff.india-water.gov.in/image/DHUBRI.png';
        img.onload = () => {
            setImageLoaded(true);
        };
        img.onerror = () => {
            console.error('Failed to load the image.');
        };
    }, []);

    if (!imageLoaded) {
        return <p>Loading image...</p>;
    }

    const imageData = {
        source: 'https://aff.india-water.gov.in/image/DHUBRI.png', // URL of the image
        x: 0, // X-coordinate of the image (in plot coordinates)
        y: 1, // Y-coordinate of the image (in plot coordinates)
        xref: 'paper', // X-coordinate reference (options: 'paper', 'x', 'y')
        yref: 'paper', // Y-coordinate reference (options: 'paper', 'x', 'y')
        sizex: 0.5, // Width of the image (in plot coordinates)
        sizey: 0.5, // Height of the image (in plot coordinates)
        opacity: 1, // Image opacity (0 to 1)
        layer: 'above', // Layer where the image is placed ('below' or 'above' the plot)
    };

    const layout = {
        title: 'Chart with Image',
        xaxis: { title: 'X-Axis' },
        yaxis: { title: 'Y-Axis' },
        images: [imageData], // Add the image data to the layout
    };

    return (
        <Plot
            data={[]}
            layout={layout}
            style={{ width: '100%', height: '400px' }}
        />
    );
};

export default ChartWithImage;