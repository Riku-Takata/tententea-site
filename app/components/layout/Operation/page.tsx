"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import ModalIn from "./modal-in";
import ModalOut from "./modal-out";

export default function Operation(){
    const operationRef = useRef(null);
    const [isModalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen2, setModalOpen2] = useState(false);
    const openModal1 = () => setModalOpen1(true);
    const closeModal1 = () => setModalOpen1(false);
    const openModal2 = () => setModalOpen2(true);
    const closeModal2 = () => setModalOpen2(false);
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
                            className="md:max-w-[400px] w-full lg:max-w-[550px] block bg-gray-300 md:px-6 md:py-4 md:text-sm lg:text-lg text-lg lg:px-8 lg:py-6 px-8 py-6 rounded-md hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-[#908464] font-medium text-center"
                            onClick={openModal1}
                        >
                            店内でフードやスイーツ等のお食事をされたいお客様 →
                        </button>
                        <ModalIn isOpen={isModalOpen1} onClose={closeModal1} />
                        <p className="mx-auto pt-5 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            <br/>
                        </p>
                        <button
                            className="md:max-w-[400px] w-full lg:max-w-[550px] block bg-gray-300 md:px-6 md:py-4 md:text-sm lg:text-lg text-lg lg:px-8 lg:py-6 px-8 py-6 rounded-md hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-[#908464] font-medium text-center"
                            onClick={openModal2}
                        >
                            お食事以外のドリンクやジェラートをご注文したいお客様 →
                        </button>
                        <ModalOut isOpen2={isModalOpen2} onClose2={closeModal2} />
                    </div>
                    <Image
                        alt="Operation"
                        className="mx-auto overflow-hidden rounded-xl object-cover"
                        height="1270"
                        src="/tententea2.png"
                        width="1270"
                    />
                </div>
            </div>
        </section>
    )
}