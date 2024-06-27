"use client"

import { LogoView } from "@/app/LogoView"
import Link from "next/link"
import { Session } from "@supabase/auth-helpers-nextjs"

export default function AuthHeader({ session }: { session: Session | null }){
    return(
        <nav className='flex px-7 py-5 items-center justify-between bg-[#7d6f49] text-white'>
            <Link href="/components/Management">
                <LogoView />
            </Link>
            {session ? (
                <div>
                <Link href="/Setting/Logout">
                    <img
                        height={40}
                        width={40}
                        src="/user_check_icon.png"
                    />
                </Link>
                </div>
            ) : (
                <div>
                <Link href="/components/Management">
                    <img
                        height={40}
                        width={40}
                        src="/user_icon.png"
                    />
                </Link>
                </div>
            )}
        </nav>
    )
}