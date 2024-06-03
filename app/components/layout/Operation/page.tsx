"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import Modal from "./modal";

const faqs = [
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

export default function Operation(){
    const operationRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return(
        <section ref={operationRef} id="operation" className="w-full py-7 md:py-7 lg:py-12 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-5xl">
                            Operation
                        </h1>
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            店内へのご案内方法
                        </div>
                        <p className="mx-auto pt-5 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            店内の見取り図になります。<br/><br/>
                            店内座席：テーブル 三十席、カウンター 五席<br/>
                            テラス席：テーブル 十八席<br/><br/><br/>
                        </p>
                        <button
                            className="bg-gray-300 text-lg px-8 py-6 rounded-md hover:bg-gray-400"
                            onClick={openModal}
                        >
                            店内でFoodsやSweetsといったお食事をされたいお客様 →
                        </button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
                            <p className="mb-4">This is the content of the modal.</p>
                            <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                            >
                            Close
                            </button>
                        </Modal>
                    </div>
                    <Image
                        alt="Operation"
                        className="mx-auto overflow-hidden rounded-t-xl object-cover"
                        height="1270"
                        src="/tententea2.png"
                        width="1270"
                    />
                </div>
            </div>
        </section>
    )
}