import React, { useState, useEffect } from "react";

const LiveClockUpdate = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID); // Cleanup interval on component unmount
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const tick = () => {
        setDate(new Date());
    };

    return (
        <div>
            <h2>{date.toLocaleTimeString()}.</h2>
        </div>
    );
};

export default LiveClockUpdate;
