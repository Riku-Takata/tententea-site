"use client"

import { LogoView } from "@/app/LogoView"
import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

export default function AuthHeader({ session }: { session: Session | null }){
    return(
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <Link href="/">
                <LogoView />
            </Link>
            {session ? (
                <div className="flex items-center space-x-5">
                <Link href="/settings/profile">
                    <img src="/user_check_icon.png" />
                </Link>
                </div>
            ) : (
                <div className="flex items-center space-x-5">
                <Link href="/auth/Sighup">
                    <img src="/user_icon.png" />
                </Link>
                </div>
            )}
        </nav>
    )
}