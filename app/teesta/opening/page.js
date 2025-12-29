"use client"

import Link from 'next/link';

const Page = () => {

    return (
        <div className="h-screen flex justify-center items-center p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {/*<button>Home</button>*/}
            <Link href="/">
                {/*<button>Opening</button>*/}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl">
                    Opening
                </button>
            </Link>
        </div>
    )
}

export default Page