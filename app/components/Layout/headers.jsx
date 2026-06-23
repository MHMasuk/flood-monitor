"use client";

import WordWideConcernsIcon from "@/app/components/Icons/WorldWideConcers";

import Image from 'next/image';
import Link from 'next/link'
import RimesLogo from "@/app/components/Icons/RimesLogo";
import LiveClockUpdate from "@/app/components/Chart/LiveClockUpdate";

const Headers = () => {

    return (
        <div className="fixed top-0 w-full h-16 navbar bg-white text-neutral-content z-50 shadow-sm">
            <div className="navbar-start">
                <Link href="/">
                    <Image src="/icons/flood_resilence.png" alt="od-resilience-logo" width={100} height={20} />
                </Link>
                <div className="ml-2 md:ml-6 text-xs md:text-base lg:text-xl text-black font-bold">
                    <LiveClockUpdate />
                </div>
            </div>
            <div className="navbar-center">
                <RimesLogo />
                <Link href="/" className="ml-1">
                    <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                </Link>
            </div>
            <div className="navbar-end gap-1">
                <Link href="/rain-fall" target="_blank" className="hidden md:inline-flex btn btn-sm mr-1.5">RainFall Forecast</Link>
                <Link href="/trend" target="_blank" className="hidden md:inline-flex btn btn-sm mr-1.5">Teesta Hydrograph</Link>
                <WordWideConcernsIcon />
                <div className="dropdown dropdown-end md:hidden">
                    <button tabIndex={0} className="btn btn-ghost btn-sm px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu menu-sm shadow bg-white rounded-box w-48 mt-1 z-50 border border-gray-100 text-black">
                        <li><Link href="/rain-fall" target="_blank" className="text-black font-medium active:bg-gray-100">RainFall Forecast</Link></li>
                        <li><Link href="/trend" target="_blank" className="text-black font-medium active:bg-gray-100">Teesta Hydrograph</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Headers;