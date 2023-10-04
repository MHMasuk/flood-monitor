import React from "react";

const Trend = () => {
    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                    <img src="https://flood-ffwc.rimes.int/others/teesta-tank-plts/03102023.png" alt="Image 1" className="max-h-screen w-auto" />
                    {/*<img src="https://flood-ffwc.rimes.int/others/teesta-tank-plts/exceendence20230825.png" alt="Image 1" className="max-h-screen w-auto" />*/}
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src="https://flood-ffwc.rimes.int/others/teesta-tank-plts/exceendence20231003.png" alt="Image 2" className="max-h-screen w-auto" />
                </div>
            </div>
        </div>
    )
}

export default Trend