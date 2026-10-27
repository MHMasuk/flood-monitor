"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from "next/dynamic";
import { useLanguage } from "@/app/context/LanguageContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Discharge forecast chart for an FFWC basin-wise forecast (ensemble percentiles)
const FulgaziForecastChart = ({
    basin,
    title,
    titleBn,
    paperColor = '#e0f2fe',
    dangerLevel = null, // fallback when the API metadata has no "dl"
    refreshInterval = 15
}) => {
    const { language } = useLanguage();
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchForecastData = useCallback(async (isInitial = false) => {
        if (!basin) return;
        if (isInitial) setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/basin-forecast/${basin}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            setForecastData(await response.json());
        } catch (err) {
            console.error(`Error fetching ${basin} forecast data:`, err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [basin]);

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);
        return () => window.removeEventListener('resize', updateIsMobile);
    }, []);

    useEffect(() => {
        fetchForecastData(true);
        const interval = setInterval(() => fetchForecastData(), refreshInterval * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchForecastData, refreshInterval]);

    const displayTitle = useMemo(() => {
        const baseTitle = language === 'bn' && titleBn ? titleBn : title;
        const dates = forecastData?.data?.date;
        if (!dates?.length) return baseTitle;
        const fmt = d => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        return `${baseTitle} (${fmt(dates[0])} - ${fmt(dates[dates.length - 1])})`;
    }, [language, title, titleBn, forecastData]);

    const statusBox = (message, subMessage) => (
        <div
            className="w-full h-full rounded-lg relative flex items-center justify-center border border-gray-200"
            style={{ backgroundColor: paperColor }}
        >
            <div className="text-center p-4">
                <p className="text-gray-600 font-semibold">{message}</p>
                <p className="text-gray-500 text-sm mt-1">{displayTitle}</p>
                {subMessage && <p className="text-gray-400 text-xs mt-2">{subMessage}</p>}
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div
                className="w-full h-full rounded-lg relative flex items-center justify-center border border-gray-200"
                style={{ backgroundColor: paperColor }}
            >
                <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-3">
                        <svg className="animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-600 font-semibold">{language === 'bn' ? 'তথ্য লোড হচ্ছে...' : 'Loading Data...'}</p>
                    <p className="text-gray-500 text-sm mt-1">{displayTitle}</p>
                </div>
            </div>
        );
    }

    if (error && !forecastData) {
        return statusBox(language === 'bn' ? 'তথ্য লোড করতে ত্রুটি' : 'Error Loading Data', error);
    }

    const series = forecastData?.data;
    if (!series?.date?.length) {
        return statusBox(
            language === 'bn' ? 'তথ্য পাওয়া যায়নি' : 'No Data Available',
            language === 'bn' ? 'পরে আবার চেষ্টা করুন' : 'Please try again later'
        );
    }

    const dates = series.date.map(d => new Date(d));
    const dl = parseFloat(forecastData?.metadata?.dl ?? dangerLevel);

    // Same styling as the FFWC website forecast chart: danger level + 25/50/75% quantile lines
    const traces = [];

    if (!isNaN(dl)) {
        traces.push({
            x: dates,
            y: dates.map(() => dl),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Danger Level',
            line: { color: '#e53e2f', width: 2 },
            marker: { symbol: 'circle', size: 9, color: '#ffffff', line: { color: '#000000', width: 1 } }
        });
    }

    traces.push(
        {
            x: dates,
            y: series['25%'],
            type: 'scatter',
            mode: 'lines+markers',
            name: '25% Quantile',
            line: { color: '#7cc4f2', width: 1.5 },
            marker: { symbol: 'diamond-open', size: 5, color: '#000000' }
        },
        {
            x: dates,
            y: series['50%'],
            type: 'scatter',
            mode: 'lines+markers',
            name: '50% Quantile',
            line: { color: '#f6c445', width: 1.5 },
            marker: { symbol: 'square-open', size: 5, color: '#000000' }
        },
        {
            x: dates,
            y: series['75%'],
            type: 'scatter',
            mode: 'lines+markers',
            name: '75% Quantile',
            line: { color: '#a52a2a', width: 1.5 },
            marker: { symbol: 'triangle-up-open', size: 6, color: '#000000' }
        }
    );

    // Pad the y-axis so lines at the min/max (e.g. 0 or DL) don't hug the plot edges
    const yValues = [...series['25%'], ...series['50%'], ...series['75%'], ...(isNaN(dl) ? [] : [dl])]
        .map(Number)
        .filter(v => !isNaN(v));
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yPad = (yMax - yMin) * 0.1 || 1;

    const layout = {
        title: {
            text: displayTitle,
            font: { size: isMobile ? 11 : 12, family: 'Arial, sans-serif', color: '#1e40af' }
        },
        xaxis: {
            title: isMobile ? '' : 'Forecast Date',
            type: 'date',
            tickformat: '%d-%b %H:%M',
            showgrid: true,
            tickangle: isMobile ? -45 : 0,
            automargin: true,
            // Fixed daily spacing (Plotly's auto ticks fall back to weekly over a 15-day range)
            tickmode: 'linear',
            tick0: dates[0],
            // Step in whole days so about 4 dates are labelled without overlapping
            dtick: Math.max(1, Math.ceil((dates.length - 1) / 4)) * 24 * 60 * 60 * 1000
        },
        yaxis: {
            title: isMobile ? 'm³/s' : 'Discharge (m³/s)',
            gridcolor: '#e5e7eb',
            zeroline: false,
            showgrid: true,
            automargin: true,
            range: [yMin - yPad, yMax + yPad]
        },
        paper_bgcolor: paperColor,
        plot_bgcolor: '#ffffff',
        margin: { l: isMobile ? 45 : 55, r: 15, t: isMobile ? 35 : 50, b: isMobile ? 75 : 60 },
        showlegend: true,
        legend: {
            orientation: 'h',
            y: isMobile ? -0.32 : -0.45,
            x: 0.5,
            xanchor: 'center',
            yanchor: 'top',
            font: { size: isMobile ? 10 : 12 }
        },
        autosize: true
    };

    return (
        <div
            className="w-full h-full border-2 border-blue-400 rounded-lg overflow-hidden relative"
            style={{ backgroundColor: paperColor }}
        >
            <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                {language === 'bn' ? '🔮 পূর্বাভাস' : '🔮 FORECAST'}
            </div>
            <Plot
                data={traces}
                layout={layout}
                config={{
                    responsive: true,
                    displayModeBar: false,
                    displaylogo: false,
                    useResizeHandler: true
                }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler={true}
            />
        </div>
    );
};

export default FulgaziForecastChart;
