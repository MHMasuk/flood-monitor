"use client";

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from "next/dynamic";
import { useLanguage } from "@/app/context/LanguageContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const ComillaForecastChart = ({
    paperColor = '#e0f2fe',
    title = 'Gomoti River Discharge Forecast (Cumilla)',
    titleBn = 'গোমতি নদীর প্রবাহ পূর্বাভাস (কুমিল্লা)',
    dangerLevel = 290 // DL for Cumilla in m³/s
}) => {
    const { language } = useLanguage();

    // Calculate initial height function
    const calculateChartHeight = () => {
        if (typeof window === 'undefined') return 400; // Default for SSR

        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const reservedSpace = 140;
        const availableHeight = screenHeight - reservedSpace;

        let desiredHeight;
        if (screenWidth < 1024) {
            desiredHeight = (availableHeight / 2) - 40;
        } else {
            desiredHeight = (availableHeight / 2) - 40;
        }

        const minHeight = 280;
        const maxHeight = 550;
        return Math.max(minHeight, Math.min(maxHeight, desiredHeight));
    };

    const [chartHeight, setChartHeight] = useState(calculateChartHeight);
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateChartHeight = () => {
        setChartHeight(calculateChartHeight());
    };

    // Fetch forecast data
    const fetchForecastData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/comilla-forecast', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            const data = await response.json();
            setForecastData(data);
        } catch (err) {
            console.error('Error fetching forecast data:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        updateChartHeight();
        fetchForecastData();

        const handleResize = () => updateChartHeight();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    // Prepare data for Plotly
    const preparePlotData = () => {
        if (!forecastData || !forecastData.data) return [];

        const dates = forecastData.data.date.map(d => new Date(d));
        const values25 = forecastData.data['25%'];
        const values50 = forecastData.data['50%'];
        const values75 = forecastData.data['75%'];

        const traces = [
            // Fill area between 25% and 75% for better visibility
            {
                x: [...dates, ...dates.slice().reverse()],
                y: [...values75, ...values25.slice().reverse()],
                type: 'scatter',
                fill: 'toself',
                fillcolor: 'rgba(147, 197, 253, 0.25)',
                line: { color: 'transparent' },
                name: 'Range',
                showlegend: false,
                hoverinfo: 'skip'
            },
            {
                x: dates,
                y: values75,
                type: 'scatter',
                mode: 'lines+markers',
                name: '75%',
                line: { color: '#dc2626', width: 1.5, dash: 'dot' },
                marker: { size: 6, color: '#dc2626', symbol: 'triangle-up', line: { color: '#fff', width: 0.5 } }
            },
            {
                x: dates,
                y: values50,
                type: 'scatter',
                mode: 'lines+markers',
                name: '50%',
                line: { color: '#1d4ed8', width: 2 },
                marker: { size: 6, color: '#1d4ed8', symbol: 'diamond', line: { color: '#fff', width: 0.5 } }
            },
            {
                x: dates,
                y: values25,
                type: 'scatter',
                mode: 'lines+markers',
                name: '25%',
                line: { color: '#15803d', width: 1.5, dash: 'dash' },
                marker: { size: 6, color: '#15803d', symbol: 'triangle-down', line: { color: '#fff', width: 0.5 } }
            }
        ];

        // Add Danger Level (DL) line
        if (dangerLevel) {
            traces.push({
                x: [dates[0], dates[dates.length - 1]],
                y: [dangerLevel, dangerLevel],
                type: 'scatter',
                mode: 'lines',
                // name: language === 'bn' ? 'বিপদ স্তর (DL)' : 'Danger Level (DL)',
                name: 'Danger Level (DL)',
                line: { color: 'red', width: 1.5, dash: 'dash' }
            });
        }


        return traces;
    };

    const displayTitle = language === 'bn' ? titleBn : title;

    // Get forecast date range for subtitle
    const getForecastDateRange = () => {
        if (!forecastData || !forecastData.data || !forecastData.data.date) return '';
        const dates = forecastData.data.date;
        const startDate = new Date(dates[0]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        const endDate = new Date(dates[dates.length - 1]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        return `(${startDate} - ${endDate})`;
    };

    const layout = {
        title: {
            text: `${displayTitle}`,
            font: { size: 14, family: 'Arial, sans-serif', color: '#1e40af' }
        },
        xaxis: {
            // title: language === 'bn' ? 'তারিখ' : 'Date',
            title: 'Date',
            type: 'date',
            tickformat: '%d-%b',
            showgrid: true,
            tickangle: 0,
            automargin: true,
            tickmode: 'auto',
            nticks: 8
        },
        yaxis: {
            // title: language === 'bn' ? 'প্রবাহ (m³/s)' : 'Discharge (m³/s)',
            title: 'Discharge (m³/s)',
            showgrid: true,
            automargin: true
        },
        paper_bgcolor: paperColor,
        plot_bgcolor: '#ffffff',
        margin: { l: 55, r: 20, t: 50, b: 120 },
        height: chartHeight,
        showlegend: true,
        legend: {
            orientation: 'h',
            y: -0.45,
            x: 0.5,
            xanchor: 'center',
            yanchor: 'top'
        },
        autosize: true
    };

    // Loading state
    if (isLoading) {
        return (
            <div
                className="w-full rounded-lg relative flex items-center justify-center border border-gray-200"
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
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

    // Error state
    if (error) {
        return (
            <div
                className="w-full flex items-center justify-center border border-red-200 bg-red-50 rounded-lg"
                style={{ height: chartHeight + 'px' }}
            >
                <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-600 font-semibold">{language === 'bn' ? 'তথ্য লোড করতে ত্রুটি' : 'Error Loading Data'}</p>
                    <p className="text-red-500 text-sm mt-1">{displayTitle}</p>
                    <p className="text-red-400 text-xs mt-2">{error}</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!forecastData || !forecastData.data) {
        return (
            <div
                className="w-full flex items-center justify-center border border-gray-200 rounded-lg"
                style={{ height: chartHeight + 'px', backgroundColor: paperColor }}
            >
                <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-gray-600 font-semibold">{language === 'bn' ? 'তথ্য পাওয়া যায়নি' : 'No Data Available'}</p>
                    <p className="text-gray-500 text-sm mt-1">{displayTitle}</p>
                    <p className="text-gray-400 text-xs mt-2">{language === 'bn' ? 'পরে আবার চেষ্টা করুন' : 'Please try again later'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full border-2 border-blue-400 rounded-lg overflow-hidden relative">
            {/* Forecast Badge */}
            <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                {language === 'bn' ? '🔮 পূর্বাভাস' : '🔮 FORECAST'}
            </div>
            <Plot
                data={preparePlotData()}
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

export default ComillaForecastChart;
