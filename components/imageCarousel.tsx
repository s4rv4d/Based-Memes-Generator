// // components/ImageCarousel.tsx
import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  onImageSelect: ({ index }: { index: number }) => {};
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onImageSelect,
}) => {
  return (
    <div className="flex overflow-x-auto w-full new-create-bg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Carousel image ${index}`}
          className="flex-shrink-0 object-cover"
          style={{ height: "5rem", paddingBottom: 20 }}
          onClick={() => {
            onImageSelect({ index });
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
