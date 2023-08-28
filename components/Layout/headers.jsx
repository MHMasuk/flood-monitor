"use client";

import WordWideConcernsIcon from "@/components/Icons/WorldWideConcers";

import Image from 'next/image';
import Link from 'next/link'

const Headers = () => {

    return (
        <div className="fixed top-0 navbar bg-white text-neutral-content">
            <div className="navbar-start">
                <Image src="/icons/flood-resilience-logo.svg" alt="Heart Icon" width={90} height={15} />
            </div>
            <div className="navbar-center">
                <Image src="/icons/bangladesh-govt-logo-vector.svg" alt="Heart Icon" width={50} height={20} />
            </div>
            <div className="navbar-end">
                <Link href="/trend" target="_blank" className="btn btn-sm">Teesta Plots</Link>
                <WordWideConcernsIcon />
            </div>
        </div>
    )
}


export default Headers;