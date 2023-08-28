import {getLocalDate, getFormattedDate} from "@/utils/healper";

export async function fetchDaliaStationData() {
    const token_data = process.env.NEXT_PUBLIC_TOKEN

    const sixHoursAgo = new Date(new Date() + 6 * 60 * 60 * 1000);

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token_data}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 3))}&date_to=${getFormattedDate(new Date())}`, requestOptions);
        // const response = await fetch(`https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=2023-08-21T18:00:00&date_to=2023-08-27T18:00:00`, requestOptions);

        // console.log("fetchDaliaPointData(): fetchDaliaPointData", `https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=${getFormattedDate(getLocalDate(new Date().setDate(new Date().getDate() - 3)))}&date_to=${getFormattedDate(getLocalDate(new Date()))}`)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}