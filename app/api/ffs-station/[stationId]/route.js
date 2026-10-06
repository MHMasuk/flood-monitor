import { NextResponse } from "next/server";
import { getFfsStationData } from "@/utils/getFfsStationData";

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
    const { params } = context;
    const { stationId } = params;

    try {
        const data = await getFfsStationData(stationId);

        return NextResponse.json(data);
    } catch (error) {
        // fetch() errors (e.g. TLS reset / blocked IP) carry the real reason in error.cause
        const reason = error.cause?.code || error.cause?.message;
        return NextResponse.json(
            { error: reason ? `${error.message} (${reason})` : error.message },
            { status: 500 }
        );
    }
}
