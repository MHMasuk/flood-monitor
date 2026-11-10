import {getCwcHhsSeries} from "@/utils/getCwcStationData";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

// Mekhliganj (023-LBDJPG) water level from the FFWC proxy of India CWC data (cwcdata.ffwc.gov.bd)
export async function GET() {
    try {
        const data = await getCwcHhsSeries('023-LBDJPG');
        return NextResponse.json(data);
    } catch (error) {
        console.error('cwc/mikligong route error:', error);
        return NextResponse.json({error: error.message}, {status: 502});
    }
}
