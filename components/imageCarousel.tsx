// // components/ImageCarousel.tsx
import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  onImageSelect: ({ index }: { index: number }) => {};
  selectedIndex: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onImageSelect,
  selectedIndex,
}) => {
  return (
    <div className="flex overflow-x-auto w-full new-create-bg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Carousel image ${index}`}
          className="flex-shrink-0 object-cover"
          style={{
            height: "5rem",
            border: index === selectedIndex ? "2px solid white" : "none",
            borderRadius: 8,
            margin: 8,
            marginBottom: 12,
          }}
          onClick={() => {
            onImageSelect({ index });
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
