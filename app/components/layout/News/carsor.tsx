import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type CarouselProps = {
    images: string[];
    interval?: number;
    imageWidth?: number;  // 追加
    imageHeight?: number; // 追加
};

const NewsCarousel: React.FC<CarouselProps> = ({ images, interval = 4000, imageWidth = 600, imageHeight = 400 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [activeIndex]);

    const startAutoSlide = () => {
        stopAutoSlide(); // 既存のインターバルをクリア
        intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
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
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        startAutoSlide();
    };

    const handleNext = () => {
        stopAutoSlide();
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        startAutoSlide();
    };

    return (
        <div className="relative w-full overflow-hidden" style={{ height: `${imageHeight}px` }}>
            <div className="relative h-full">
                {images.map((img: string, index: number) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
                    index === activeIndex ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ transform: `translateX(${100 * (index - activeIndex)}%)` }}
                >
                    <Image
                    src={img}
                    alt={`Slide ${index}`}
                    layout="responsive"
                    style={{
                        aspectRatio: "500/400",
                        objectFit: "cover",
                    }}
                    width={imageWidth}
                    height={imageHeight}
                    objectFit="cover"
                    />
                </div>
                ))}
            </div>
        </div>
    );
};

export default NewsCarousel;