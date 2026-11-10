import {getDomohoniStationData} from "@/utils/getDomohoniStationData";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getDomohoniStationData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('domohoni route error:', error);
        return NextResponse.json({error: error.message}, {status: 502});
    }
}
