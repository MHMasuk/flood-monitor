import {getMikliGongStationData} from "@/utils/getMikliGongStationData";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getMikliGongStationData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('mikligong route error:', error);
        return NextResponse.json({error: error.message}, {status: 502});
    }
}
