import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

import Headers from "@/app/components/Layout/headers";
import Footer from "@/app/components/Layout/footer";

import {MyJWTContextProvider} from "@/app/JWTContext/JWTContext";

export const metadata = {
    title: 'Flood Monitoring.',
    description: 'Teesta flood monitoring.',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        {/*<MyJWTContextProvider>*/}
            <body className="max-h-screen bg-neutral">
                <Headers />
                    {children}
                <Footer />
            </body>
        {/*</MyJWTContextProvider>*/}
        </html>
    )
}

