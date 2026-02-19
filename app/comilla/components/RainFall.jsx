import React from "react";

const RainFall = () => {
    return (
        <div className="h-full flex justify-center items-center p-4">
            <iframe
                src="https://instant.rimes.int/weather_map_teesta"
                style={{width: "100%", height: "100%"}}
                title="Weather Map Comilla"
                className="rounded-lg shadow-lg"
            ></iframe>
        </div>
    )
}

export default RainFall;
