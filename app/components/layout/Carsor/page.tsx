"use client"

import { useState, useRef, useEffect } from 'react';
import Post from '../InstagramPost/page'; // 正しいパスを指定

type CarouselProps = {
  posts: any[];  // 変更: ポストの配列を受け取るようにする
  interval?: number;
};

const NewsCarousel: React.FC<CarouselProps> = ({ posts = [], interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex]);

  const startAutoSlide = () => {
    stopAutoSlide(); // 既存のインターバルをクリア
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, interval);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePrev = () => {
    stopAutoSlide();
    setActiveIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    startAutoSlide();
  };

  const handleNext = () => {
    stopAutoSlide();
    setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
    startAutoSlide();
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-full">
        {posts.map((post, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === activeIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(${100 * (index - activeIndex)}%)` }}
          >
            <Post {...post} /> {/* ポストのデータを渡してPostコンポーネントを表示 */}
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 z-10 p-2 transform -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-0 z-10 p-2 transform -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
  );
};

export default NewsCarousel;
