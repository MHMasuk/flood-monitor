import {getLocalDate, getFormattedDate} from "@/utils/healper";

export async function getMikliGongStationData(currentDate, formattedDate) {
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
                        value: '023-LBDJPG'
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
                    // value: `${getFormattedDate(getLocalDate(new Date().setDate(new Date().getDate() - 3)))},${getFormattedDate(getLocalDate(new Date()))}`
                    value: `${getFormattedDate(new Date().setDate(new Date().getDate() - 3))},${getFormattedDate(new Date())}`
                }
            }
        }
    };

    const queryParams = new URLSearchParams({
        'sort-criteria': JSON.stringify(sortCriteria),
        'specification': JSON.stringify(specification)
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;

    // console.log(finalUrl);
    // const new_url = "https://ffs.india-water.gov.in/iam/api/new-entry-data/specification/sorted?sort-criteria=%7B%22sortOrderDtos%22:%5B%7B%22sortDirection%22:%22ASC%22,%22field%22:%22id.dataTime%22%7D%5D%7D&specification=%7B%22where%22:%7B%22where%22:%7B%22where%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.stationCode%22,%22operator%22:%22eq%22,%22value%22:%22023-LBDJPG%22%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.datatypeCode%22,%22operator%22:%22eq%22,%22value%22:%22HHS%22%7D%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22dataValue%22,%22operator%22:%22null%22,%22value%22:%22false%22%7D%7D%7D,%22and%22:%7B%22expression%22:%7B%22valueIsRelationField%22:false,%22fieldName%22:%22id.dataTime%22,%22operator%22:%22btn%22,%22value%22:%222023-08-14T16:32:25.554,2023-08-17T16:32:25.554%22%7D%7D%7D";
    // const res = await fetch(finalUrl, {
    //     next: { revalidate: 1 }
    // })
    const res = await fetch(finalUrl)
    // The return value is *not* serialized

    // console.log('response', res.status)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}