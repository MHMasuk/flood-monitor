import {getCwcHhsSeries} from "@/utils/getCwcStationData";

// Mekhliganj (023-LBDJPG) water level, served by the FFWC proxy of India CWC data
// (https://cwcdata.ffwc.gov.bd). Returns HHS records sorted by time, ascending.
export async function getMikliGongStationData() {
    return getCwcHhsSeries('023-LBDJPG');
}
