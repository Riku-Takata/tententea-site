"use client"

import { useState } from 'react';
import Footer from '../layout/Footer/page';
import ComHeader from '../layout/ComHeader/page';
import Link from 'next/link';
import Auth from '../useAuth/useAuth';

export default function Manager() {
    return (
        <section className="flex-1">
            <ComHeader />
            <Auth />
            <div className="w-full py-8 md:py-8 lg:py-14">
                <div className="flex flex-col space-y-4 text-right mx-auto max-w-5xl pt-5 lg:gap-12 hover:text-blue-600">
                    <Link href="/">
                        <p>トップページへ戻る →</p>
                    </Link>
                </div>
            </div>
            <Footer />
        </section>
    );
}