"use client";
import { useState, useRef } from "react";
import { Public_Sans } from "next/font/google";

// font stuff
const inter = Public_Sans({ subsets: ["latin"] });

export const CreateGIF = () => {
  // state variables
  const [gifURLString, setGifURLString] = useState<string>("");

  return (
    <div className="flex-col justify-center ${inter.className}">
      <p>TEST</p>
    </div>
  );
};
