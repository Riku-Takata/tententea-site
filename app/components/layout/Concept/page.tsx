"use client"

import { useEffect, useRef } from "react";

interface ConceptProps {
    setRef: (node: HTMLElement | null) => void;
}

const Concept: React.FC<ConceptProps> = ({setRef}) =>{
    const conceptRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setRef(conceptRef.current);
    }, [setRef]);
    return(
        <section ref={conceptRef} id="concept" className="w-full py-7 md:py-7 lg:py-12 bg-gray-100 dark:bg-gray-800">
            <div className="space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2 text-center">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-xl dark:bg-gray-800">
                            Concept
                        </div>
                        <h2 className="pb-5 text-5xl font-bold tracking-tighter sm:text-6xl">
                            Tea with your park life
                        </h2>
                        <p className="max-w-[1100px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            “点点茶”は公園を訪れた皆様に、日常の中の特別なひと時を過ごして頂けるよう<br/>
                            お茶とメインとしたドリンクやベーシックなフードメニュー、ジェラートを取り揃えております。
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">Drink</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            お茶は、カジュアルに飲めるミルクティーなどから本格的な中国茶までを取り揃え、
                            また季節のオリジナルティーは、パティシエが点点茶オリジナルのレシピを考案し、
                            お茶をよりデザート感覚で楽しめるような商品になっています。
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">Food</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            注文をお受けしてから調理を始めることで、出来立てのフードを店内でお楽しみいただけます。
                            ホットサンドやパスタなどのランチにもちょうどいいフードから、昼食後にお楽しみいただける
                            ケーキなどのスイーツもございます。
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-bold">Gelato</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            能登ミルク本店からお取り寄せたジェラートを環水公園の景色と共にお楽しみいただけます。
                            一番人気の「能登ミルク」からお茶を取り扱う点点茶の
                            コンセプトにマッチした「ジャスミン緑茶ミルクティー」などのお味もございます。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Concept;