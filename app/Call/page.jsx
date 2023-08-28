"use client";

import React, { useEffect, useState, useRef } from 'react';
import DaliaChartDemo from "@/app/components/Chart/DaliaChatDemo";

export default function Call() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const intervalRef = useRef(null); // Create a ref to hold the interval ID

    useEffect(() => {
        // This function fetches data from the API
        const fetchData = () => {
            fetch('/api/product')
                .then((response) => response.json())
                .then((data) => {
                    // Set the data received from the API in state
                    setData(data);
                    setLoading(false); // Set loading to false when data is received
                    console.log(data);
                })
                .catch((error) => {
                    setLoading(false); // Set loading to false on error as well
                    console.error('Error fetching data:', error);
                });
        };

        // Initial data fetch
        fetchData();

        // Set up an interval to fetch data every 6 seconds
        intervalRef.current = setInterval(() => {
            fetchData();
        }, 6000); // 6000 milliseconds = 6 seconds

        // Cleanup: Clear the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // The empty dependency array ensures this code runs only once when the component mounts

    // Render a loading indicator when loading is true
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center p-4">
                <h1>Loading...</h1>
            </div>
        );
    }

    // Render the component with the fetched data when loading is false
    return (
        <div className="h-screen flex justify-center items-center p-4">
            <h1>API Response</h1>
            <DaliaChartDemo
                chart_data={data}
                title="Hydrograph view of - Dalia (SW291.5 R)"
                hfl="52.84"
                danger="52.15"
                warning="51.75"
                paperColor="#fef9c3"
            />
        </div>
    );
}
