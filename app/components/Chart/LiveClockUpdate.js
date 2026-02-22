"use client";
import React, { useState, useEffect } from "react";

const LiveClockUpdate = () => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        // Set initial date on client-side only
        setDate(new Date());

        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID); // Cleanup interval on component unmount
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const tick = () => {
        setDate(new Date());
    };

    // Show placeholder during SSR to avoid hydration mismatch
    if (!date) {
        return (
            <div>
                <h2>-- ---, ---- --:--:-- --</h2>
            </div>
        );
    }

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString();

    return (
        <div>
            <h2>{formattedDate} {formattedTime}</h2>
        </div>
    );
};

export default LiveClockUpdate;
