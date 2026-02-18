"use client";

import ComillaHeader from "./components/ComillaHeader";
import ComillaFooter from "./components/ComillaFooter";
import { LanguageProvider } from "@/app/context/LanguageContext";

export default function ComillaLayout({ children }) {
  return (
    <LanguageProvider defaultLanguage="bn">
      <div className="h-screen flex flex-col overflow-hidden">
        <ComillaHeader />
        <main className="flex-1 overflow-hidden pt-16 pb-14">
          {children}
        </main>
        <ComillaFooter />
      </div>
    </LanguageProvider>
  );
}
