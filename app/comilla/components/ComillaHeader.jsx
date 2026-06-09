"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import LiveClockUpdate from "@/app/components/Chart/LiveClockUpdate";
import { useLanguage } from "@/app/context/LanguageContext";

const ComillaHeader = () => {
    const { language } = useLanguage();
    const [qrOpen, setQrOpen] = useState(false);

    return (
        <>
            <div className="fixed top-0 w-full h-16 navbar bg-white text-neutral-content z-50 shadow-sm">
                <div className="navbar-start flex items-center gap-3">
                    <button
                        onClick={() => setQrOpen(true)}
                        className="tooltip tooltip-bottom ml-2"
                        data-tip="Click to enlarge QR code"
                    >
                        <Image
                            src="/qr_code/flood_monitor_comilla.png"
                            alt="QR Code – scan to visit Comilla flood monitor"
                            width={44}
                            height={44}
                            className="rounded border border-gray-200 hover:border-blue-400 transition-colors"
                        />
                    </button>
                    <div className="text-xl text-black font-bold">
                        <LiveClockUpdate language={language} />
                    </div>
                </div>
                <div className="navbar-center">
                    <Link href="/feni">
                        <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                    </Link>
                </div>
                <div className="navbar-end">
                    <Image className="bg-white" src='/icons/uk_aid.png' alt='UK International Development Logo' width={160} height={50} quality={100}/>
                </div>
            </div>

            {/* QR Code modal */}
            {qrOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60"
                    onClick={() => setQrOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-3"
                        onClick={e => e.stopPropagation()}
                    >
                        <p className="text-sm font-semibold text-gray-600">Scan to visit Comilla Flood Monitor</p>
                        <Image
                            src="/qr_code/flood_monitor_comilla.png"
                            alt="QR Code – Comilla flood monitor"
                            width={260}
                            height={260}
                            className="rounded-lg border border-gray-200"
                        />
                        <button
                            onClick={() => setQrOpen(false)}
                            className="btn btn-sm btn-ghost text-gray-500 mt-1"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ComillaHeader;
