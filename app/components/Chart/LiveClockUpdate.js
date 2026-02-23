"use client";
import React, { useState, useEffect } from "react";

const LiveClockUpdate = ({ language = 'en' }) => {
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

    // Set locale based on language
    const locale = language === 'bn' ? 'bn-BD' : 'en-GB';

    const formattedDate = date.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <div>
            <h2>{formattedDate} {formattedTime}</h2>
        </div>
    );
};

export default LiveClockUpdate;
