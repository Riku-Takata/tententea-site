"use client"

import { LogoView } from "@/app/LogoView"
import Link from "next/link"

export default function ComHeader2(){
    return(
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <Link href="/">
                <LogoView />
            </Link>
            <Link href="/components/Management">
                <img src="/icons8-user-24.png" />
            </Link>
        </nav>
    )
}