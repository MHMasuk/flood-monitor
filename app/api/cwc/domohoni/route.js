import {getCwcHhsSeries} from "@/utils/getCwcStationData";
import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic';

// Domohoni (022-LBDJPG) water level from the FFWC proxy of India CWC data (cwcdata.ffwc.gov.bd)
export async function GET() {
    try {
        const data = await getCwcHhsSeries('022-LBDJPG');
        return NextResponse.json(data);
    } catch (error) {
        console.error('cwc/domohoni route error:', error);
        return NextResponse.json({error: error.message}, {status: 502});
    }
}
