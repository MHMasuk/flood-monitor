"use client";

// api call
import MainChartNew from "@/app/components/Chart/mainChartNew";

import React, {useEffect, useRef, useState} from "react";

import {fetchTokenIfExpired} from "@/utils/jwtToken";

export default function Home() {
    const daliaDataNew = [
        {
            "datetime": "2023-08-27T03:30:00",
            "value": 51.576
        },
        {
            "datetime": "2023-08-27T03:45:00",
            "value": 51.581
        },
        {
            "datetime": "2023-08-27T04:00:00",
            "value": 51.583
        },
        {
            "datetime": "2023-08-27T04:15:00",
            "value": 51.59
        },
        {
            "datetime": "2023-08-27T04:30:00",
            "value": 51.59
        },
        {
            "datetime": "2023-08-27T04:45:00",
            "value": 51.588
        },
        {
            "datetime": "2023-08-27T05:00:00",
            "value": 51.602
        },
        {
            "datetime": "2023-08-27T05:15:00",
            "value": 51.604
        },
        {
            "datetime": "2023-08-27T05:30:00",
            "value": 51.608
        },
        {
            "datetime": "2023-08-27T05:45:00",
            "value": 51.609
        },
        {
            "datetime": "2023-08-27T06:00:00",
            "value": 51.614
        },
        {
            "datetime": "2023-08-27T06:15:00",
            "value": 51.612
        },
        {
            "datetime": "2023-08-27T06:30:00",
            "value": 49.003
        },
        {
            "datetime": "2023-08-27T06:45:00",
            "value": 51.621
        },
        {
            "datetime": "2023-08-27T07:00:00",
            "value": 49.621
        },
        {
            "datetime": "2023-08-27T07:15:00",
            "value": 51.600
        },
        {
            "datetime": "2023-08-27T07:30:00",
            "value": 48.700
        },
        {
            "datetime": "2023-08-27T07:45:00",
            "value": 51.600
        },
        {
            "datetime": "2023-08-27T08:00:00",
            "value": 51.600
        },
        {
            "datetime": "2023-08-27T09:00:00",
            "value": 53.90
        }
    ]

    const doaniaData = [
        {
            "datetime": "2023-08-27T00:15:00",
            "value": 51.485
        },
        {
            "datetime": "2023-08-27T00:30:00",
            "value": 51.496
        },
        {
            "datetime": "2023-08-27T00:45:00",
            "value": 51.502
        },
        {
            "datetime": "2023-08-27T01:00:00",
            "value": 51.511
        },
        {
            "datetime": "2023-08-27T01:15:00",
            "value": 51.521
        },
        {
            "datetime": "2023-08-27T01:30:00",
            "value": 51.527
        },
        {
            "datetime": "2023-08-27T01:45:00",
            "value": 51.533
        },
        {
            "datetime": "2023-08-27T02:00:00",
            "value": 51.537
        },
        {
            "datetime": "2023-08-27T02:15:00",
            "value": 51.547
        },
        {
            "datetime": "2023-08-27T02:30:00",
            "value": 51.553
        },
        {
            "datetime": "2023-08-27T02:45:00",
            "value": 51.559
        },
        {
            "datetime": "2023-08-27T03:00:00",
            "value": 51.563
        },
        {
            "datetime": "2023-08-27T03:15:00",
            "value": 51.565
        },
        {
            "datetime": "2023-08-27T03:30:00",
            "value": 51.576
        },
        {
            "datetime": "2023-08-27T03:45:00",
            "value": 51.581
        },
        {
            "datetime": "2023-08-27T04:00:00",
            "value": 51.583
        },
        {
            "datetime": "2023-08-27T04:15:00",
            "value": 51.59
        },
        {
            "datetime": "2023-08-27T04:30:00",
            "value": 51.59
        },
        {
            "datetime": "2023-08-27T04:45:00",
            "value": 51.588
        },
        {
            "datetime": "2023-08-27T05:00:00",
            "value": 51.602
        },
        {
            "datetime": "2023-08-27T05:15:00",
            "value": 51.604
        },
        {
            "datetime": "2023-08-27T05:30:00",
            "value": 51.608
        },
        {
            "datetime": "2023-08-27T05:45:00",
            "value": 51.609
        },
        {
            "datetime": "2023-08-27T06:00:00",
            "value": 51.614
        },
        {
            "datetime": "2023-08-27T06:15:00",
            "value": 51.612
        },
        {
            "datetime": "2023-08-27T06:30:00",
            "value": 49.003
        },
        {
            "datetime": "2023-08-27T06:45:00",
            "value": 51.621
        },
        {
            "datetime": "2023-08-27T07:00:00",
            "value": 49.621
        },
        {
            "datetime": "2023-08-27T07:15:00",
            "value": 48.600
        },
        {
            "datetime": "2023-08-27T07:30:00",
            "value": 51.700
        },
        {
            "datetime": "2023-08-27T07:45:00",
            "value": 48.700
        },
        {
            "datetime": "2023-08-27T07:45:00",
            "value": 52.90
        },
        // {
        //     "datetime": "2023-08-27T08:00:00",
        //     "value": 51.800
        // }
    ]

    const mikligongData = [
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T15:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.77,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T16:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.77,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T17:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.76,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T18:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.74,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T19:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.72,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T20:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.7,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T21:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.68,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T22:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.64,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-26T23:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.6,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T00:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.57,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T01:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.54,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T02:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.52,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T03:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.5,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T04:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.52,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T05:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.56,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T06:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.61,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T07:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.64,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T08:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.66,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T09:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.69,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T10:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.71,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T11:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.73,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T12:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.73,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T13:00:00",
                "datatypeCode": "HHS",
                "stationCode": "023-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 65.7,
            "datatypeCode": "HHS",
            "stationCode": "023-LBDJPG"
        }
    ]

    const domohoniDataNew = [
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T03:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.72,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T04:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.75,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T05:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.77,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T06:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.78,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T07:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.78,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T08:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.78,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T09:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.77,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T10:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.75,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T11:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.73,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T12:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.72,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        },
        {
            "@class": "com.eptisa.dto.SimpleNewEntryDataDto",
            "id": {
                "dataTime": "2023-08-27T13:00:00",
                "datatypeCode": "HHS",
                "stationCode": "022-LBDJPG"
            },
            "dataValidatedValue": null,
            "dataValue": 85.72,
            "datatypeCode": "HHS",
            "stationCode": "022-LBDJPG"
        }
    ]

    const [productData, setProductData] = useState([]);
    const [mikliGongStationData, setMikliGongStationData] = useState([]);
    const [domohoniWaterLevelData, setDomohoniWaterLevelData] = useState([]);
    const [daliaStationData, setDaliaStationData] = useState([]);
    const [doaniaStationData, setDoaniaStationData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const intervalRef = useRef(null); // Create a ref to hold the interval ID

    async function fetchData(url, setData) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            // Set error state here
        }
    }

    async function fetchNewData(url, setData) {

        const tokenData = await fetchTokenIfExpired();

        try {
            // const response = await fetch(url);
            const response = await fetch(url, {
                method: 'GET', // or 'POST' or any other HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    'Custom-Token': `${tokenData}`,
                },
                // You can include additional options like body, credentials, etc.
            });
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            // Set error state here
        }
    }

    useEffect(() => {
        // setTimeout(() => {
        //     // Fetch a new token before making the first API requests
        //     fetchData('/api/mikligong', setMikliGongStationData);
        //     fetchData('/api/domohoni', setDomohoniWaterLevelData);
        //     fetchNewData('/api/doani', setDoaniaStationData);
        //     fetchNewData('/api/dalia', setDaliaStationData);
        // }, 2000)


        // Fetch a new token before making the first API requests
        fetchData('/api/mikligong', setMikliGongStationData);
        fetchData('/api/domohoni', setDomohoniWaterLevelData);
        fetchNewData('/api/doani', setDoaniaStationData);
        fetchNewData('/api/dalia', setDaliaStationData);

        // 900000 15 minutes 15 minutes = 15 * 60 * 1000 milliseconds
        intervalRef.current = setInterval(() => {
            fetchData('/api/mikligong', setMikliGongStationData);
            fetchData('/api/domohoni', setDomohoniWaterLevelData);
            fetchNewData('/api/doani', setDoaniaStationData);
            fetchNewData('/api/dalia', setDaliaStationData);
        }, 10000);


        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Render a loading indicator when loading is true
    // if (loading) {
    //     return (
    //         <div className="h-screen flex justify-center items-center p-4">
    //             <h1>Loading...</h1>
    //         </div>
    //     );
    // }



    return (
        <main className="h-screen flex justify-center items-center">
            {mikliGongStationData.length > 0 && domohoniWaterLevelData.length > 0 && daliaStationData.length > 0 && doaniaStationData.length > 0 ? (
            // {mikliGongStationData.length > 0 && domohoniWaterLevelData.length > 0 ? (
                <MainChartNew
                    mikliGongStationData={mikliGongStationData}
                    domohoniWaterLevelData={domohoniWaterLevelData}
                    daliaStationData={daliaStationData}
                    // daliaStationData={daliaDataNew}
                    doaniaStationData={doaniaStationData}
                    // doaniaStationData={daliaDataNew}
                    // productData={productData}
                />
            ) : (
                // Render a loading indicator or message
                // <span className="loading loading-spinner loading-lg"></span>
                <p>Loading...</p>
            )}
        </main>
    )
}
