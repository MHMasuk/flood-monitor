"use client";

import TeestaHeader from "./components/TeestaHeader";
import TeestaFooter from "./components/TeestaFooter";
import { LanguageProvider } from "@/app/context/LanguageContext";

export default function TeestaLayout({ children }) {
  return (
    <LanguageProvider defaultLanguage="bn">
      <div className="h-screen flex flex-col overflow-hidden">
        <TeestaHeader />
        <main className="flex-1 overflow-hidden pt-16 pb-14">
          {children}
        </main>
        <TeestaFooter />
      </div>
    </LanguageProvider>
  );
}
