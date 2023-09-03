import React from "react";

const RainFall = () => {
    return (
        <div className="h-screen flex justify-center items-center p-4">
            <iframe src="https://instant.rimes.int/weather_map_teesta" width={1400} height={550}></iframe>
        </div>
    )
}

export default RainFall