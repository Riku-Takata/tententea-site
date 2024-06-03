"use client"

import Image from "next/image";
import Link from "next/link";
import ComHeader from "../layout/ComHeader/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../layout/Footer/page";

interface Items{
    name: string;
    image: string;
    price: string;
}
interface MenuItemGroup {
    type: string;
    type2: string;
    items: Items[];
}

interface MenuItems {
    [key: string]: MenuItemGroup[];
}

export default function AllMenu(){
    const [selectedCategory, setSelectedCategory] = useState<string>('Drink');
    const categories = ['Drink', 'Food', 'Gelato'];
    const menuItems: MenuItems = {
        Drink: [
            {   type: 'Special Tea',
                type2: 'ICE / HOT',
                items: [
                    {name: 'ベリー抹茶ティー', price: '¥ 648', image:''},
                    {name: 'カラメルほうじティー', price: '¥ 660', image:''},
                    {name: 'オレンジアッサムティー', price: '¥ 648', image:''},
                ]
            },
            {   type: 'Standard Tea',
                type2: 'ICE / HOT',
                items: [
                    {name: '紅茶', price: '¥ 432', image:''},
                    {name: 'ほうじ茶', price: '¥ 432', image:''},
                    {name: '鉄観音烏龍茶', price: '¥ 432', image:''},
                    {name: 'ジャスミン緑茶', price: '¥ 432', image:''},
                    ]
            },
            {   type: '',
                type2: 'ドリンクカスタマイズ',
                items: [
                    {name: '砂糖の量（無/少なめ/普通/多め）', price: '無料', image:''},
                    {name: 'ミルクティー変更', price: '¥ 129', image:''},
                    {name: '黒糖タピオカ', price: '¥ 108', image:''},
                    {name: 'オレオ', price: '¥ 108', image:''},
                    {name: 'チーズフォーム', price: '¥ 162', image:''},
                    ]
            },
            {   type: '本格中国茶',
                type2: 'HOT',
                items: [
                    {name: '黄金桂(烏龍茶)', price: '¥ 540', image:''},
                    {name: '四季春茶(烏龍茶)', price: '¥ 540', image:''},
                    {name: '白牡丹(白茶)', price: '¥ 540', image:''},
                    {name: '茉莉香片(ジャスミン茶)', price: '¥ 540', image:''},
                    {name: '龍井茶(緑茶)', price: '¥ 540', image:''},
                    ]
            },
            {   type: 'コーヒー',
                type2: 'ICE / HOT',
                items: [
                    {name: 'ブラックコーヒー', price: '¥ 432', image:''},
                    {name: 'カフェラテ', price: '¥ 518', image:''},
                    {name: 'キャラメルラテ', price: '¥ 561', image:''},
                    {name: 'アーモンドキャラメルラテ', price: '¥ 561', image:''},
                    ]
            },
            {   type: '黒糖ミルクラテ ¥ 507',
                type2: 'ICE / HOT',
                items: [
                    {name: 'トッピング: 黒糖タピオカ', price: '¥ 615', image:''},
                    {name: 'トッピング: チーズフォーム', price: '¥ 669', image:''},
                ]
            },
        ],
        Food: [
            {   type: 'Foods',
                type2: 'Hot Sandwiches',
                items: [
                    {name: '立山ホークのトマト煮', price: '¥ 1580', image:''},
                    {name: '色々きのこのクリームソース煮', price: '¥ 1480', image:''},
                    {name: 'シュリンプフリットと自家製タルタル', price: '¥ 1380', image:''},
                    {name: 'スモークサーモンとクリームチーズ', price: '¥ 1479', image:''},
                    ]
            },
            {   type: '',
                type2: 'Others',
                items: [
                    {name: '色々やさいのファーマーズシーザー', price: '¥ 1380', image:''},
                    {name: '煮込みデミグラスハンバーグ', price: '¥ 1580', image:''},
                    {name: 'モッツアレラと厚切りベーコンのトマトソースパスタ', price: '¥ 1580', image:''},
                    {name: 'デミグラスソースのふわふわオムライス', price: '¥ 1380', image:''},
                    ]
            },
            {   type: 'Sweets',
                type2: '',
                items: [
                    {name: 'ふわとろデニッシュフレンチトースト', price: '¥ 880', image:''},
                    {name: '能登ミルクジェラートとWベリーのデニッシュフレンチトースト', price: '¥ 1080', image:''},
                    {name: 'メルティーショートケーキ', price: '¥ 980', image:''},
                    {name: 'マンゴーとジェラートのアーモンドミルクワッフル', price: '¥ 980', image:''},
                    ]
            },
            {   type: 'SET',
                type2: '+ ¥330',
                items: [
                    {name: 'ブラックコーヒー(Hot/Ice)', price: '', image:''},
                    {name: '紅茶(Hot/Ice)', price: '', image:''},
                    {name: '烏龍茶(Hot/Ice)', price: '', image:''},
                    {name: 'アップルジュース', price: '', image:''},
                    ]
            },
            {   type: '',
                type2: '+ ¥440',
                items: [
                    {name: 'カフェラテ(Hot/Ice)', price: '', image:''},
                    {name: '本格中国茶黄金桂(Hot)', price: '', image:''},
                    {name: '本格中国茶白牡丹(Hot)', price: '', image:''},
                    {name: '本格中国茶茉莉香片(Hot)', price: '', image:''},
                    {name: '高級中国茶龍井(Hot)', price: '', image:''},
                    {name: '高級中国茶四季春(Hot)', price: '', image:''},
                    ]
            },
            {   type: '',
                type2: '+ ¥660 (中国茶をポットでお出しします)',
                items: [
                    {name: '本格中国茶黄金桂(Hot)', price: '', image:''},
                    {name: '本格中国茶白牡丹(Hot)', price: '', image:''},
                    {name: '本格中国茶茉莉香片(Hot)', price: '', image:''},
                    {name: '高級中国茶龍井(Hot)', price: '', image:''},
                    {name: '高級中国茶四季春(Hot)', price: '', image:''},
                    ]
            },
            {   type: '',
                type2: 'デザートジェラート',
                items: [
                    {name: 'シングルジェラート(カップ/コーン)', price: '¥ 429', image:''},
                    {name: 'ダブルジェラート(カップ/コーン)', price: '¥ 539', image:''},
                    ]
            },
        ],
        Gelato: [
        {   type: '',
            type2: '',
            items: [
                {name: 'シングルジェラート（カップ / コーン）', price: '¥ 432', image:''},
                {name: 'ダブルジェラート（カップ / コーン）', price: '¥ 540', image:''},
                ]
        },
        {   type: 'Kinds',
            type2: '※ 季節限定商品を含みますので、店舗にないものもございます。',
            items: [
                {name: '能登ミルク', price: '', image:''},
                {name: 'ジャスミン緑茶ミルクティー', price: '', image:''},
                {name: '加賀棒茶', price: '', image:''},
                {name: '宇治抹茶', price: '', image:''},
                {name: 'チョコレート', price: '', image:''},
                {name: '黒ゴマ', price: '', image:''},
                {name: '能登ミルク飲むヨーグルト', price: '', image:''},
                {name: '天然塩', price: '', image:''},
                {name: 'アマレーナ', price: '', image:''},
                {name: 'ラムレーズン', price: '', image:''},
                {name: '能登いちご', price: '', image:''},
                {name: 'レアチーズケーキ', price: '', image:''},
                ]
        },
        ],
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        if (category && categories.includes(category)) {
            setSelectedCategory(category);
        }
    }, []);

    return(
        <main className="flex-1">
            <ComHeader />
            <div className="w-full py-8 md:py-8 lg:py-14">
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
                    <div className="container mx-auto py-8">
                        {/* カテゴリタブ */}
                        <div className="flex justify-center space-x-14 mb-8">
                            {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`py-2 px-10 rounded ${selectedCategory === cat ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                            ))}
                        </div>
                        {/* メニューアイテム */}
                        <div className="space-y-8">
                            {menuItems[selectedCategory].map((group, index) => (
                            <div key={index}>
                                <h2 className="p-2 text-xl font-bold mb-4">{group.type}</h2>
                                <h5 className="p-5 mb-4 text-gray-800">{group.type2}</h5>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="p-4 border text-lg rounded-lg bg-gray-100">
                                    {item.name}<br/>{item.price}
                                    </div>
                                ))}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 text-right mx-auto max-w-5xl pt-5 lg:gap-12 hover:text-blue-600">
                        <Link href="/">
                            <p>トップページへ戻る →</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}