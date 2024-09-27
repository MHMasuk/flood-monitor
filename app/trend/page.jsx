"use client"

import React, {useEffect, useState, useMemo} from "react";

// async function dischargeDalia() {
//     const res = await fetch('/api/discharge-dalia', { next: { revalidate: 3600 }})
//     // // The return value is *not* serialized
//     // // You can return Date, Map, Set, etc.
//     //
//     // console.log(JSON.stringify(res.text()))
//     //
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//
//     return res.json()
// }
//
// async function OutlookProbabilityDalia() {
//     const res = await fetch('/api/probability-dalia', { next: { revalidate: 3600 }})
//     // // The return value is *not* serialized
//     // // You can return Date, Map, Set, etc.
//     //
//     // console.log(JSON.stringify(res.text()))
//     //
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//
//     return res.json()
// }



const Trend = () => {
    const [dischargeDaliaData, setDischargeDaliaData] = useState(null)
    const [outlookProbabilityDaliaData, setOutlookProbabilityDaliaData] = useState(null)

    useEffect(() => {
        fetch('/api/probability-dalia')
            .then((res) => res.json())
            .then((data) => {
                setOutlookProbabilityDaliaData(data)
            })

        fetch('/api/discharge-dalia')
            .then((res) => res.json())
            .then((data) => {
                setDischargeDaliaData(data)
            })
    }, []);


    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                    {/*<img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${dischargeDaliaData}`} alt="Image 1" className="max-h-screen w-auto" />*/}
                    <img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/25092024_corr_DL.png`} alt="Image 1" className="max-h-screen w-auto" />
                    {/*<img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${outlookProbabilityDaliaData}`} alt="Image 2" className="max-h-screen w-auto" />*/}
                </div>
                <div className="flex flex-col justify-center items-center">
                    {/*<img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${outlookProbabilityDaliaData}`} alt="Image 2" className="max-h-screen w-auto" />*/}
                    <img src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/exceendence20240925.png`} alt="Image 2" className="max-h-screen w-auto" />
                </div>
            </div>
        </div>
    )
}

export default Trend
