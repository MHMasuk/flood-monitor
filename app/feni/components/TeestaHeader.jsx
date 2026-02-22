"use client";

import Image from 'next/image';
import Link from 'next/link';

import LiveClockUpdate from "@/app/components/Chart/LiveClockUpdate";

const TeestaHeader = () => {
    return (
        <div className="fixed top-0 w-full h-16 navbar bg-white text-neutral-content z-50 shadow-sm">
            <div className="navbar-start">
                {/*<Link href="/teesta">*/}
                {/*    /!* Add your custom logo here *!/*/}
                {/*    <Image src="/icons/flood_resilence.png" alt="flood-resilience-logo" width={100} height={20} />*/}
                {/*</Link>*/}
                <div className="ml-8 text-xl text-black font-bold">
                    <LiveClockUpdate />
                </div>
            </div>
            <div className="navbar-center">
                {/* Add your custom center logos here */}
                {/*<RimesLogo />*/}
                <Link href="/feni">
                    <Image src="/icons/pani-unnoyon-board.png" alt="pani-unnoyon-board" width={50} height={20} />
                </Link>
            </div>
            <div className="navbar-end">
                {/*<Link href="/rain-forecast" target="_blank" className="btn btn-sm mr-1.5">RainFall Forecast</Link>*/}
                {/*<WordWideConcernsIcon />*/}
                <Image className="bg-white" src='/icons/uk_aid.png' alt='UK International Development Logo' width={160} height={50} quality={100}/>
            </div>
        </div>
    );
};

export default TeestaHeader;
