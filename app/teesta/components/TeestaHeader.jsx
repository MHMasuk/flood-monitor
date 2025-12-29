"use client";

import Image from 'next/image';
import Link from 'next/link';

import RimesLogo from "@/app/components/Icons/RimesLogo";
import LiveClockUpdate from "@/app/components/Chart/LiveClockUpdate";
import WordWideConcernsIcon from "@/app/components/Icons/WorldWideConcers";

const TeestaHeader = () => {
    return (
        <div className="fixed top-0 navbar bg-white text-neutral-content z-50">
            <div className="navbar-start">
                <Link href="/teesta">
                    {/* Add your custom logo here */}
                    <Image src="/icons/flood_resilence.png" alt="flood-resilience-logo" width={100} height={20} />
                </Link>
                <div className="ml-8 text-2xl text-black font-bold">
                    <LiveClockUpdate />
                </div>
            </div>
            <div className="navbar-center">
                {/* Add your custom center logos here */}
                <RimesLogo />
                <Link href="/teesta">
                    <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/rain-fall" target="_blank" className="btn btn-sm mr-1.5">RainFall Forecast</Link>
                <WordWideConcernsIcon />
            </div>
        </div>
    );
};

export default TeestaHeader;
