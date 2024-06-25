"use client"

import React, { useState } from 'react';

const faqData = [
    {
        question: "フードやスイーツなどの食事をしたい時は、どうすればいいですか？",
        answer: "ご来店時に店員の方へ「食事がしたいです」とお伝えいただければ、店内の方へご案内いたします。\nお席の方でご注文をとらせていただき、お食事後にレジの方でお会計をさせていただきます。",
    },
    {
        question: "飲み物やジェラートだけでも店内を利用できますか？",
        answer: "はい。ご利用いただけます。ご注文をお先にレジでお受けし、その後に店内の空いているお席をご利用いただけます。\nただし、店内のテーブル席はお食事のお客様優先とさせていただいておりますので、混雑時にはご移動いただく場合がございます。",
    },
    {
        question: "犬を連れて利用できますか？",
        answer: "はい。ご利用いただけます。ただし、犬を連れてのご来店の際はテラス席のみのご利用となります。",
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* タイトル */}
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">Your questions, answered</h2>
                <p className="mt-1 text-gray-600">--よくあるご質問--</p>
            </div>
            {/* タイトル終了 */}

            <div className="max-w-2xl mx-auto">
                {/* アコーディオン */}
                <div className="hs-accordion-group">
                {faqData.map((faq, index) => (
                    <div
                    className={`hs-accordion ${activeIndex === index ? 'hs-accordion-active:bg-gray-100 active' : ''} rounded-xl p-6`}
                    key={index}
                    >
                    <button
                        className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                        aria-controls={`hs-collapse-${index}`}
                        aria-expanded={activeIndex === index}
                        onClick={() => toggleAccordion(index)}
                    >
                        {faq.question}
                        <svg
                        className={`flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 ${activeIndex === index ? 'hidden' : 'block'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="m6 9 6 6 6-6" />
                        </svg>
                        <svg
                        className={`flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 ${activeIndex === index ? 'block' : 'hidden'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="m18 15-6-6-6 6" />
                        </svg>
                    </button>
                    <div
                        id={`hs-collapse-${index}`}
                        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
                        aria-labelledby={`hs-heading-${index}`}
                        style={{
                        maxWidth: '100%', // 横幅を固定
                        }}
                    >
                        <p className="text-gray-800 max-w-full">
                        {faq.answer}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
                {/* アコーディオン終了 */}
            </div>
    </div>
    );
};

export default FAQ;
