"use client"

import { LogoView } from "@/app/LogoView"
import Image from "next/image"
import Link from "next/link"

export default function AuthFooter(){
    return(
        <div className='absolute bottom-0 bg-[#7d6f49] text-white'>
            <div className='flex'>
                <div className='flex-1 w-screen'>
                    <div className='flex px-7 py-5 items-center justify-between'>
                        <div>
                            <Link href="/">
                                <LogoView />
                            </Link>
                            <p className="pt-2">お問い合わせ</p>
                            <p>点点茶　ebitanikana@hotmail.com</p>
                        </div>
                        <div className='font-bold flex-grow'>
                            <div className='flex justify-end flex-1 text-left text-sm min-w-full'>
                                <a href="https://www.instagram.com/ten.ten.tea?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                    <Image
                                        alt="instagram_logo"
                                        src="/instagram_logo.png"
                                        className="p-2 pt-8"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                                <p className='justify-end pt-10 text-left text-sm'>
                                    @KANSUI TERRACE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}