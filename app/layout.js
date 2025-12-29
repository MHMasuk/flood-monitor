import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

import {DummyDataProvider} from "@/app/context/DummyDataContext";

export const metadata = {
    title: 'Flood Monitoring.',
    description: 'Teesta flood monitoring.',
}

export default function RootLayout({children}) {
    return (
        <DummyDataProvider>
            <html lang="en">
                <body className={`max-h-screen bg-neutral ${inter.className}`}>
                    {children}
                </body>
            </html>
        </DummyDataProvider>
    )
}

