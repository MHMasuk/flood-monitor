"use client";

import WordWideConcernsIcon from "@/app/components/Icons/WorldWideConcers";

import Image from 'next/image';
import Link from 'next/link'
import RimesLogo from "@/app/components/Icons/RimesLogo";

const Headers = () => {

    return (
        <div className="fixed top-0 navbar bg-white text-neutral-content">
            <div className="navbar-start">
                <Link href="/">
                    <Image src="/icons/flood_resilence.png" alt="od-resilience-logo" width={100} height={20} />
                </Link>
            </div>
            <div className="navbar-center">
                <RimesLogo />
                <Link href="/" className="ml-1">
                    <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/rain-fall" target="_blank" className="btn btn-sm mr-1.5">RainFall Forecast</Link>
                <Link href="/trend" target="_blank" className="btn btn-sm">Teesta Hydrograph</Link>
                <WordWideConcernsIcon />
            </div>
        </div>
    )
}


export default Headers;