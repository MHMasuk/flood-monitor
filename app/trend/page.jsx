import React from "react";

async function exceendenceProbabilityData() {
    const res = await fetch('https://flood-ffwc.rimes.int/others/teesta-tank-plts/probability.date.json')
    // // The return value is *not* serialized
    // // You can return Date, Map, Set, etc.
    //
    // console.log(JSON.stringify(res.text()))
    //
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function hydrographData() {
    const res = await fetch('https://flood-ffwc.rimes.int/others/teesta-tank-plts/hydrograph.date.json')
    // // The return value is *not* serialized
    // // You can return Date, Map, Set, etc.
    //
    // console.log(JSON.stringify(res.text()))
    //
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Trend = async () => {
    const exceedence_probability = await exceendenceProbabilityData()
    const hydrograph = await hydrographData()

    console.log(exceedence_probability)
    console.log(hydrograph)

    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                    <img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${exceedence_probability}.png`} alt="Image 1" className="max-h-screen w-auto" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/exceendence${hydrograph}.png`} alt="Image 2" className="max-h-screen w-auto" />
                </div>
            </div>
        </div>
    )
}

export default Trend