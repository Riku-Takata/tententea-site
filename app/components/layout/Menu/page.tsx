"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface MenuProps{
    setRef: (node: HTMLElement | null) => void;
}
const Menu: React.FC<MenuProps> = ({setRef}) => {
    const menuRef = useRef(null);

    useEffect(() => {
        setRef(menuRef.current);
    }, []);
    return(
        <section ref={menuRef} id="menu" className="w-full py-8 md:py-8 lg:py-14">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="pb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
                            Menu
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            フードは店内またはテラス席でお楽しみいただけます。<br/>
                            ドリンクは店内またはお持ち帰りでお楽しみいただけます。
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                        <Link className="absolute inset-0 z-10" href={{pathname: '/components/AllMenu', query: {category: 'Drink'}}}>
                            <span className="sr-only">View</span>
                        </Link>
                        <Image
                            className="object-cover w-full h-64"
                            alt="Drink"
                            style={{
                                aspectRatio: "500/400",
                                objectFit: "cover",
                            }}
                            src="/tea.jpg"
                            height="200"
                            width="300"
                        >
                        </Image>
                        <div className="bg-white p-5 dark:bg-gray-950 border-t">
                            <h3 className="font-bold text-xl">Drink</h3>
                            <p className="text-sm text-gray-500">中国茶、当店オリジナルティー、コーヒーなど</p>
                            <div className="mx-auto grid grid-cols-2">
                                <h4 className="font-semibold text-lg md:text-xl">¥400 +tax ~</h4>
                                <h4 className="text-lg md:text-xl text-right">→</h4>
                            </div>
                        </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                        <Link className="absolute inset-0 z-10" href={{pathname: '/components/AllMenu', query: {category: 'Food'}}}>
                            <span className="sr-only">View</span>
                        </Link>
                        <Image
                            className="object-cover w-full h-64"
                            alt="Drink"
                            style={{
                                aspectRatio: "500/400",
                                objectFit: "cover",
                            }}
                            src="/food.jpg"
                            height="200"
                            width="300"
                        >
                        </Image>
                        <div className="bg-white p-5 dark:bg-gray-950 border-t">
                            <h3 className="font-bold text-xl">Food</h3>
                            <p className="text-sm text-gray-500">ホットサンドなどフードからケーキなどのスイーツまで</p>
                            <div className="mx-auto grid grid-cols-2">
                                <h4 className="font-semibold text-lg md:text-xl">¥880 +tax ~</h4>
                                <h4 className="text-lg md:text-xl text-right">→</h4>
                            </div>
                        </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                        <Link className="absolute inset-0 z-10" href={{pathname: '/components/AllMenu', query:{category: 'Gelato'}}}>
                            <span className="sr-only">View</span>
                        </Link>
                        <Image
                            className="object-cover w-full h-64"
                            alt="Drink"
                            style={{
                                aspectRatio: "500/400",
                                objectFit: "cover",
                            }}
                            src="/gelato.jpg"
                            height="200"
                            width="300"
                        >
                        </Image>
                        <div className="bg-white p-5 dark:bg-gray-950 border-t">
                            <h3 className="font-bold text-xl">Gelato</h3>
                            <p className="text-sm text-gray-500">能登ミルクなどのベーシックな種類から季節限定のお味も</p>
                            <div className="mx-auto grid grid-cols-2">
                                <h4 className="font-semibold text-lg md:text-xl">¥400 +tax ~</h4>
                                <h4 className="text-lg md:text-xl text-right">→</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu;