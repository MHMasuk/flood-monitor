import React from "react";

const RainFall = () => {
    return (
        <div className="h-screen flex justify-center items-center p-4">
            <iframe
                src="https://instant.rimes.int/weather_map_teesta"
                style={{width: "100vw", height: "75vh"}}
                title="Weather Map Teesta"
            ></iframe>
        </div>
    )
}

export default RainFall