// // components/ImageCarousel.tsx
import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  onImageSelect: ({ index }: { index: number }) => void;
  selectedIndex: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onImageSelect,
  selectedIndex,
}) => {
  return (
    <div
      className="flex overflow-x-auto max-w-[220px] lg:max-w-[800px]  w-auto"
      // style={{
      //   display: "flex",
      //   overflowX: "auto",
      //   maxWidth: "220px",
      //   width: "auto",
      // }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Carousel image ${index}`}
          className="flex-shrink-0 object-cover overflow-x-hidden"
          style={{
            height: "40px",
            border: index === selectedIndex ? "2px solid white" : "none",
            borderRadius: 4,
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
