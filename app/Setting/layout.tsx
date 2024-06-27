'use client'

import {
    EnvelopeIcon,
    KeyIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ComHeader from '../components/layout/ComHeader/page'
import Footer from '../components/layout/Footer/page'
import AuthHeader from '../components/layout/AuthHeader/page'
import SupabaseListener_H from '../supabase_listener_H'
import SupabaseListener_F from '../supabase_listener_F'

// ナビゲーション
const subNavigation = [
    {
        name: 'メールアドレス変更',
        icon: EnvelopeIcon,
        href: '/Setting/Email',
    },
    {
        name: 'パスワード変更',
        icon: KeyIcon,
        href: '/Setting/Password',
    },
    {
        name: 'ログアウト',
        icon: ArrowLeftOnRectangleIcon,
        href: '/Setting/Logout',
    },
    ]

    // レイアウト
    const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div>
            <SupabaseListener_H />
            <div className="grid grid-cols-3 gap-3 m-5 space-x-5">
                <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
                    {subNavigation.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div
                        className={`${
                            item.href == pathname && 'bg-sky-100 text-sky-500'
                        } hover:bg-sky-100 px-3 py-2 rounded-full`}
                        >
                        <item.icon className="inline-block w-5 h-5 mr-2" />
                        {item.name}
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="col-span-2">{children}</div>
            </div>
            <SupabaseListener_F />
        </div>
    )
}

export default SettingsLayout