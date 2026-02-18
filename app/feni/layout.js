"use client";

import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";
import { LanguageProvider } from "@/app/context/LanguageContext";

export default function TeestaLayout({ children }) {
  return (
    <LanguageProvider defaultLanguage="bn">
      <div className="min-h-screen flex flex-col">
        <TeestaHeader />
        <main className="flex-1 pt-16 pb-12">
          {children}
        </main>
        <TeestaFooter />
      </div>
    </LanguageProvider>
  );
}
