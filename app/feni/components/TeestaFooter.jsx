"use client";

import RimesLogo from "@/app/components/Icons/RimesLogo";
import { useLanguage } from "@/app/context/LanguageContext";

const TeestaFooter = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <footer className="footer items-center fixed bottom-0 w-full h-14 bg-neutral text-neutral-content p-1 z-50 shadow-lg">
            <div className="items-center grid-flow-col">
                {/* Add your custom footer content here */}
                <RimesLogo />
                <p>Technical Partner & Implementing by <strong>Regional Integrated Multi-Hazard Early Warning System (RIMES)</strong></p>
            </div>
            <div className="flex items-center gap-4 md:place-self-center md:justify-self-end">
                {/* Language Toggle Button */}
                <button
                    onClick={toggleLanguage}
                    className="btn btn-sm bg-white hover:bg-gray-100 text-gray-800 border-white font-semibold"
                    title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
                >
                    {language === 'en' ? '🇧🇩 বাংলা' : '🇬🇧 English'}
                </button>
                {/* Add your custom partner logos here */}
                {/*<p>Partner</p>*/}
                {/*<Image className="bg-white" src='/icons/uk_aid.png' alt='UK International Development Logo' width={200} height={100} quality={100}/>*/}
            </div>
        </footer>
    );
};

export default TeestaFooter;
