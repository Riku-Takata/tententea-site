"use client"

import { useState } from 'react';
import Footer from '../layout/Footer/page';
import ComHeader from '../layout/ComHeader/page';
import Auth from "../useAuth/useAuth";
import Link from 'next/link';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: 'Q1. よくある質問1',
        answer: 'A1. よくある質問1に対する回答です。',
    },
    {
        question: 'Q2. よくある質問2',
        answer: 'A2. よくある質問2に対する回答です。',
    },
    {
        question: 'Q3. よくある質問3',
        answer: 'A3. よくある質問3に対する回答です。',
    },
];

export default function Contact() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        if (openIndex === index) {
        setOpenIndex(null);
        } else {
        setOpenIndex(index);
        }
    };

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
                            <h2 className="text-2xl font-semibold mb-4">Reservation</h2>
                            <p className="mb-4">ご予約はお電話にて受け付けております。</p>
                            <p className="mb-4">TEL: 000-0000-0000</p>
                            <p className="mb-8">
                            内容例：お名前、ご来店予定人数、お電話番号、その他
                            </p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">FAQ - よくあるご質問</h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-md px-10 py-4 bg-white shadow">
                        <button
                            className="w-full text-left focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                            <span className="font-medium">{faq.question}</span>
                            </div>
                        </button>
                        {openIndex === index && (
                            <div className="mt-2 text-gray-700">{faq.answer}</div>
                        )}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex flex-col space-y-4 text-right mx-auto max-w-5xl pt-5 lg:gap-12 hover:text-blue-600">
                    <Link href="/">
                        <p>トップページへ戻る →</p>
                    </Link>
                </div>
                <Auth/>
            </div>
            <Footer />
        </section>
    );
}