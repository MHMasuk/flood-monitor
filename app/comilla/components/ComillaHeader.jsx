"use client";

import Image from 'next/image';
import Link from 'next/link';

import LiveClockUpdate from "@/app/components/Chart/LiveClockUpdate";

const ComillaHeader = () => {
    return (
        <div className="fixed top-0 w-full h-16 navbar bg-white text-neutral-content z-50 shadow-sm">
            <div className="navbar-start">
                {/*<Link href="/comilla">*/}
                {/*    /!* Add your custom logo here *!/*/}
                {/*    <Image src="/icons/flood_resilence.png" alt="flood-resilience-logo" width={100} height={20} />*/}
                {/*</Link>*/}
                <div className="ml-8 text-2xl text-black font-bold">
                    <LiveClockUpdate />
                </div>
            </div>
            <div className="navbar-center">
                {/* Add your custom center logos here */}
                {/*<RimesLogo />*/}
                <Link href="/comilla">
                    <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/rain-forecast" target="_blank" className="btn btn-sm mr-1.5">RainFall Forecast</Link>
                {/*<WordWideConcernsIcon />*/}
                <Image className="bg-white" src='/icons/uk_aid.png' alt='UK International Development Logo' width={200} height={80} quality={100}/>
            </div>
        </div>
    );
};

export default ComillaHeader;
