import {getLocalDate, getFormattedDate} from "@/utils/healper";

export async function getDomohoniStationData() {
    const baseUrl = 'https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted';

    const sortCriteria = {
        sortOrderDtos: [
            {
                sortDirection: 'ASC',
                field: 'id.dataTime'
            }
        ]
    };

    const specification = {
        where: {
            where: {
                where: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.stationCode',
                        operator: 'eq',
                        value: '022-LBDJPG'
                    }
                },
                and: {
                    expression: {
                        valueIsRelationField: false,
                        fieldName: 'id.datatypeCode',
                        operator: 'eq',
                        value: 'HHS'
                    }
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'dataValue',
                    operator: 'null',
                    value: 'false'
                }
            },
            and: {
                expression: {
                    valueIsRelationField: false,
                    fieldName: 'id.dataTime',
                    operator: 'btn',
                    value: `${getFormattedDate(new Date().setDate(new Date().getDate() - 3))},${getFormattedDate(new Date())}`
                }
            }
        }
    };

    // console.log("data, ", `${getFormattedDate(new Date().setDate(new Date().getDate() - 3))},${getFormattedDate(new Date())}`)
    const queryParams = new URLSearchParams({
        'sort-criteria': JSON.stringify(sortCriteria),
        'specification': JSON.stringify(specification)
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    // console.log(finalUrl);

    const res = await fetch(finalUrl, {
        cache: 'no-store' // Disable caching
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}