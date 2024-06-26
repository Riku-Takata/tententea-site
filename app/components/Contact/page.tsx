"use client"

import Link from 'next/link';
import ComHeader from '../layout/ComHeader/page';
import FAQ from '../layout/Faq/page';
import Footer from '../layout/Footer/page';

export default function Contact() {
    return (
        <section className="flex-1">
            <ComHeader />
            <div className="w-full py-8 md:py-8 lg:py-14">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="pb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
                            Contact
                        </h2>
                        <div className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            <p className="mb-4">ご予約はお電話にて受け付けております。</p>
                            <h5 className="text-lg mb-4">TEL: 076-456-1103</h5>
                            <p className="mb-8">
                            内容例：お名前、ご来店予定人数、お電話番号、その他ご要望など
                            </p>
                        </div>
                    </div>
                </div>
                <FAQ />
                <div className="flex flex-col space-y-4 text-right mx-auto max-w-5xl pt-5 pr-5 lg:gap-12 hover:text-blue-600">
                    <Link href="/">
                        <p>トップページへ戻る →</p>
                    </Link>
                </div>
            </div>
            <Footer />
        </section>
    );
}