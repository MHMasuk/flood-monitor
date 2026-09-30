"use client";

import FulgaziHeader from "./components/FulgaziHeader";
import FulgaziFooter from "./components/FulgaziFooter";
import {LanguageProvider} from "@/app/context/LanguageContext";

export default function FulgaziLayout({children}) {
    return (
        <LanguageProvider defaultLanguage="bn">
            <div className="h-screen flex flex-col overflow-hidden">
                <FulgaziHeader/>
                <main className="flex-1 overflow-hidden pt-16 pb-14">
                    {/*<FulgaziHeader/>*/}
                        {children}
                    {/*<FulgaziFooter/>*/}
                </main>
                <FulgaziFooter/>
            </div>
        </LanguageProvider>
    );
}
