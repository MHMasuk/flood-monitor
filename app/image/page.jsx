import Image from 'next/image'

import LineChartWithDangerLine from "@/components/Chart/lineChartWithDangerLine";


const apiConfig = {
    url: 'https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=2023-08-14T18:00:00&date_to=2023-08-20T18:00:00',
    headers: {
        'Accept': 'application/json',
        // ... other headers
    },
    username: 'ffwc',
    password: 'ffwc123*#',
};

async function makeApiCall(apiConfig) {
    try {
        const response = await fetch(apiConfig.url, {
            method: 'GET',
            headers: apiConfig.headers,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getData(currentDate, formattedDate) {
    console.log("${getFormattedDate(new Date().setDate(new Date().getDate() - 3))},${getFormattedDate(new Date())}", `${getFormattedDate(new Date().setDate(new Date().getDate() - 3)).replace("Z", "")},${getFormattedDate(new Date()).replace("Z", "")}`)
    const baseUrl = 'https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted';

    // Function to get the local date
    function getLocalDate(date) {
        const offset = new Date().getTimezoneOffset() * 60000;
        return new Date(date - offset);
    }

    // Function to format a date as 'YYYY-MM-DDTHH:MM:SS.sss' in local time
    function getFormattedDate(date) {
        return new Date(date).toISOString().slice(0, 23);
    }

    const sortCriteria = {
        sortOrderDtos: [
            {
                sortDirection: 'ASC',
                field: 'id.dataTime'
            }
        ]
    };

    const specification = {
        where: {
            where: {
                where: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.stationCode',
                        operator: 'eq',
                        value: '023-LBDJPG'
                    }
                },
                and: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.datatypeCode',
                        operator: 'eq',
                        value: 'HHS'
                    }
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'dataValue',
                    operator: 'null',
                    value: 'false'
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'id.dataTime',
                    operator: 'btn',
                    value: `${getFormattedDate(getLocalDate(new Date().setDate(new Date().getDate() - 3)))},${getFormattedDate(getLocalDate(new Date()))}`
                }
            }
        }
    };

    const queryParams = new URLSearchParams({
        'sort-criteria': JSON.stringify(sortCriteria),
        'specification': JSON.stringify(specification)
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    console.log(finalUrl);
    // const new_url = "https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted?sort-criteria=%7B%22sortOrderDtos%22:%5B%7B%22sortDirection%22:%22ASC%22,%22field%22:%22id.dataTime%22%7D%5D%7D&specification=%7B%22where%22:%7B%22where%22:%7B%22where%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.stationCode%22,%22operator%22:%22eq%22,%22value%22:%22023-LBDJPG%22%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.datatypeCode%22,%22operator%22:%22eq%22,%22value%22:%22HHS%22%7D%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22dataValue%22,%22operator%22:%22null%22,%22value%22:%22false%22%7D%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.dataTime%22,%22operator%22:%22btn%22,%22value%22:%222023-08-14T16:32:25.554,2023-08-17T16:32:25.554%22%7D%7D%7D";
    const res = await fetch(finalUrl)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    console.log('response', res.status)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


async function getDomohoniWaterLevel(currentDate, formattedDate) {
    const baseUrl = 'https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted';

    // Function to get the local date
    function getLocalDate(date) {
        const offset = new Date().getTimezoneOffset() * 60000;
        return new Date(date - offset);
    }

    // Function to format a date as 'YYYY-MM-DDTHH:MM:SS.sss' in local time
    function getFormattedDate(date) {
        return new Date(date).toISOString().slice(0, 23);
    }

    const sortCriteria = {
        sortOrderDtos: [
            {
                sortDirection: 'ASC',
                field: 'id.dataTime'
            }
        ]
    };

    const specification = {
        where: {
            where: {
                where: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.stationCode',
                        operator: 'eq',
                        value: '022-LBDJPG'
                    }
                },
                and: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.datatypeCode',
                        operator: 'eq',
                        value: 'HHS'
                    }
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'dataValue',
                    operator: 'null',
                    value: 'false'
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'id.dataTime',
                    operator: 'btn',
                    value: `${getFormattedDate(getLocalDate(new Date().setDate(new Date().getDate() - 3)))},${getFormattedDate(getLocalDate(new Date()))}`
                }
            }
        }
    };

    const queryParams = new URLSearchParams({
        'sort-criteria': JSON.stringify(sortCriteria),
        'specification': JSON.stringify(specification)
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    // console.log(finalUrl);

    const res = await fetch(finalUrl)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function ImageShow() {
    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date three days ago
    currentDate.setDate(currentDate.getDate() - 3);

    // Format the date as a string in the desired format (YYYY-MM-DDTHH:mm:ss.sss)
    // const formattedDate = currentDate.toISOString();
    const formattedDate = currentDate.toLocaleString().replace("Z", "");

    const formattedCurrentDate = currentDate.toISOString().replace("Z", "")

    const data = await getData(formattedCurrentDate, formattedDate)
    const domohoniWaterLevelData = await getDomohoniWaterLevel(formattedCurrentDate, formattedDate)

    // Usage
    makeApiCall(apiConfig)
        .then((data) => {
            console.log(data); // Handle the response data here
        })
        .catch((error) => {
            console.log("error", error)
        });

    return (
        <main className="bg-white flex justify-center item-center pt-1 max-h-full">
            <div className="w-full mx-5">
                <div className='flex justify-between gap-2'>
                    <div className="rounded-lg shadow-lg w-full">
                        <LineChartWithDangerLine
                            data={data}
                            title="Hydrograph view of - Mekhliganj (R/B)"
                            hfl="66.62"
                            danger="65.8"
                            warning="65.45"
                        />
                    </div>

                    <div className="rounded-lg shadow-lg w-full">
                        <LineChartWithDangerLine
                            data={domohoniWaterLevelData}
                            title="Hydrograph view of - DOMOHANI"
                            hfl="89.3"
                            danger="85.95"
                            warning="85.65"
                        />
                    </div>
                </div>
                <div className='flex justify-between gap-2 mt-3'>
                    <div className="rounded-lg shadow-lg w-full flex justify-center items-center">
                        {/*<LineChartWithDangerLine*/}
                        {/*    data={data}*/}
                        {/*    title="Hydrograph view of - Mekhliganj (R/B)"*/}
                        {/*    hfl="66.62"*/}
                        {/*    danger="65.8"*/}
                        {/*    warning="65.45"*/}
                        {/*/>*/}

                        {/*<Image src='/icons/gku_logo.jpg' alt='GKU Logo' width={40} height={40}/>*/}
                        <img src='https://aff.india-water.gov.in/image/MEKHLIGANJ_(R_B).png' alt='GKU Logo' width={450}/>
                    </div>

                    <div className="rounded-lg shadow-lg w-full flex justify-center items-center">
                        {/*<LineChartWithDangerLine*/}
                        {/*    data={data}*/}
                        {/*    title="Hydrograph view of - Mekhliganj (R/B)"*/}
                        {/*    hfl="66.62"*/}
                        {/*    danger="65.8"*/}
                        {/*    warning="65.45"*/}
                        {/*/>*/}

                        <img src='https://aff.india-water.gov.in/image/DOMOHANI.png' alt='GKU Logo' width={450}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
