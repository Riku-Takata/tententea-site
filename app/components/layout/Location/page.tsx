"use client"

export default function Map(){
    return (
        <div className="w-full py-8 md:py-8 lg:py-14 bg-[#fef7f1]">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div>
                            <h2 className="pb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
                                Location
                            </h2>
                            <div className="overflow-hidden rounded-xl object-cover ">
                                <iframe
                                    className="w-full h-[200px] sm:h-[400px] md:h-[400px] lg:h-[500px]"
                                    style={{border:0}}
                                    loading="lazy"
                                    allowFullScreen
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.475872514614!2d137.2113414765304!3d36.71113087227266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff79bc2ba300185%3A0xa624998a2f57367c!2z54K554K56Iy2!5e0!3m2!1sja!2sjp!4v1715590617055!5m2!1sja!2sjp">
                                </iframe>
                            </div>
                            <div className="pt-10 mx-auto grid items-start gap-7 sm:max-w-4xl md:gap-12 md:max-w-5xl sm:grid-cols-3">
                                <div className="grid gap-1">
                                    <h3 className="text-lg font-bold">【電車をご利用の場合】</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                    JR富山駅（北口）より徒歩15funn
                                    </p>
                                </div>
                                <div className="grid gap-1">
                                    <h3 className="text-lg font-bold">【バスをご利用の場合】</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                    JR富山駅（北口）バス停乗車<br/>
                                    環水公園バス停下車<br/>
                                    （お店の前に止まります）<br/>
                                    </p>
                                </div>
                                <div className="grid gap-1">
                                    <h3 className="text-lg font-bold">【お車をご利用の場合】</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                    環水テラス<br/>
                                    無料駐車場あり
                                    </p>
                                </div>
                            </div>
                            <div className="pt-10 mx-auto grid items-center gap-8 sm:max-w-4xl md:gap-12 lg:max-w-5xl">
                                <div className="grid gap-1">
                                    <h3 className="text-lg font-bold">＜ 営業時間 ＞</h3>
                                    <p className="text-2xl text-gray-500 dark:text-gray-400">
                                    11:00 ~ 20:00
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                    水曜定休日
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}