import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {

    // Call the function to get Domohoni station data
    const url = 'https://ffs.india-water.gov.in/iam/api/layer-station/023-LBDJPG'

    const res = await fetch(url, {
        cache: 'no-store' // Disable caching
    })

    const data = res.json()

    // Send the data as a JSON response
    return NextResponse.json(data);
}