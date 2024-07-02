"use client"

import { useRef } from "react";
import React, { useState, useEffect } from 'react';
import ContinuousImageSlider from "../PostSlider/page";

export default function News() {
  const newsRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const images = [
    { src: '/tenteninsta_0.png', alt: 'Instagram post 1' },
    { src: '/tenteninsta_1.png', alt: 'Instagram post 2' },
    { src: '/tenteninsta_2.png', alt: 'Instagram post 3' },
    { src: '/tenteninsta_3.png', alt: 'Instagram post 4' },
    { src: '/tenteninsta_4.png', alt: 'Instagram post 5' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        // 画像5枚分（80px * 5 = 400px）スクロールしたら先頭に戻る
        return newPosition >= 400 ? 0 : newPosition;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section ref={newsRef} id="news" className="w-full py-7 md:py-7 lg:py-12 bg-gray-100 dark:bg-gray-800 border-b">
      <ContinuousImageSlider
        images={images}
        speed={50}
        imageWidth={320}
        imageHeight={320}
      />
    </section>
  )
}