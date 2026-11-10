import {getCwcHhsSeries} from "@/utils/getCwcStationData";

// Domohoni (022-LBDJPG) water level from the FFWC proxy of India CWC data
// (https://cwcdata.ffwc.gov.bd).
export async function getDomohoniStationData() {
    return getCwcHhsSeries('022-LBDJPG');
}
