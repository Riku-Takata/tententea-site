"use client"

import { LogoView } from "@/app/LogoView"
import Link from "next/link"

export default function ComHeader(){
    return(
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <div>
                <Link href="/">
                    <LogoView />
                </Link>
            </div>
        </nav>
    )
}