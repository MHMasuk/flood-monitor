import {getFormattedDate} from "@/utils/healper";
import {NextResponse} from "next/server";

export async function GET(request) {
    const JWTToken = request.headers.get("Custom-Token");

    const response = await fetch(`https://swh.bwdb.gov.bd/api/observation?series_id=7068&date_from=${getFormattedDate(new Date().setDate(new Date().getDate() - 3))}&date_to=${getFormattedDate(new Date())}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTToken}`,
        },
        next: {revalidate: 30} // in every 15 minutes
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data)
}

