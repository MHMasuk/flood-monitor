"use client"

import React, {useEffect, useState} from "react";

const Trend = () => {
    const [imageData, setImageData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/trend-data')

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const response = await res.json()

                // console.log(response)

                setImageData(response)
            } catch (err) {
                console.error('Error fetching data:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading trend data...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading data: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                    <img
                        // src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${imageData?.discharge_level?.replace('./plots/', '') || '14102024_corr_DL.png'}`}
                        src={`https://flood-ffwc.rimes.int/others/teesta-tank-new-plts/${imageData?.discharge_level?.replace('./plots/', '') || '14102024_corr_DL.png'}`}
                        alt="Discharge Level Chart"
                        className="max-h-screen w-auto"
                        onError={(e) => {
                            e.target.src = `https://flood-ffwc.rimes.int/others/teesta-tank-plts/14102024_corr_DL.png`
                        }}
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img
                        // src={`https://flood-ffwc.rimes.int/others/teesta-tank-plts/${imageData?.exceedance?.replace('./plots/', '') || 'exceendence20241014.png'}`}
                        src={`https://flood-ffwc.rimes.int/others/teesta-tank-new-plts/${imageData?.exceedance?.replace('./plots/', '') || 'exceendence20241014.png'}`}
                        alt="Exceedance Chart"
                        className="max-h-screen w-auto"
                        onError={(e) => {
                            e.target.src = `https://flood-ffwc.rimes.int/others/teesta-tank-plts/exceendence20241014.png`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Trend
