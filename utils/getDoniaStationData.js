import {getLocalDate, getFormattedDate} from "@/utils/healper";


export async function fetchDoaniaStationData() {
    const token_data = process.env.NEXT_PUBLIC_TOKEN

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token_data}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://swh.bwdb.gov.bd/api/observation?series_id=7110&date_from=${getFormattedDate(getLocalDate(new Date().setDate(new Date().getDate() - 3)))}&date_to=${getFormattedDate(getLocalDate(new Date()))}`, requestOptions);

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