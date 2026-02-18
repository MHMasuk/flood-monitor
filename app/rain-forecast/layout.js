"use client";

import TeestaHeader from "@/app/feni/components/TeestaHeader";
import TeestaFooter from "@/app/feni/components/TeestaFooter";
import { LanguageProvider } from "@/app/context/LanguageContext";

export default function TeestaLayout({ children }) {
    return (
        <LanguageProvider defaultLanguage="bn">
            <div className="min-h-screen flex flex-col">
                <TeestaHeader />
                <main className="flex-1 pb-12">
                    {children}
                </main>
                <TeestaFooter />
            </div>
        </LanguageProvider>
    );
}
