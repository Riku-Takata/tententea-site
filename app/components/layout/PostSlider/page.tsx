import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SlideImage {
  src: string;
  alt: string;
}

interface ContinuousImageSliderProps {
  images: SlideImage[];
  speed?: number; // pixels per second
  imageWidth: number;
  imageHeight: number;
}

const ContinuousImageSlider: React.FC<ContinuousImageSliderProps> = ({
  images,
  speed = 50,
  imageWidth,
  imageHeight
}) => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition - 1;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const totalWidth = images.length * (imageWidth + 20); // 20px for margin
        return newPosition <= -totalWidth ? 0 : newPosition;
      });
    };

    const intervalId = setInterval(animate, 1000 / speed);

    return () => clearInterval(intervalId);
  }, [images.length, speed, imageWidth]);

  return (
    <div className="overflow-hidden" ref={containerRef}>
      <div
        className="flex"
        style={{
          transform: `translateX(${position}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ 
              width: `${imageWidth}px`, 
              height: `${imageHeight}px`,
              marginRight: '20px'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinuousImageSlider;