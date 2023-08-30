// import { NextResponse } from 'next/server'
//
// export async function GET() {
//     const res = await fetch('http://127.0.0.1:8000/api/v1/products/', {
//         next: { revalidate: 900 }, // Revalidate every 60 seconds
//     })
//     const data = await res.json()
//
//     return NextResponse.json(data)
// }