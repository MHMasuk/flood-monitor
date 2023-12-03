// import { cookies } from 'next/headers'
//
// import { NextResponse } from 'next/server'
//
// export async function GET() {
//
//     cookies().set('token', 'lee76766')
//     const cookieStore = cookies()
//
//     const token = cookieStore.get('name')
//
//     console.log(token)
//
//
//     // const res = await fetch('http://127.0.0.1:8000/api/v1/products/', {
//     //     next: { revalidate: 900 }, // Revalidate every 60 seconds
//     // })
//     // const data = await res.json()
//
//     return NextResponse.json({"data": true})
// }