import { useEffect, useState } from "react";

const useOpenCVLoader = (): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.cv) {
      console.log("window valid");
      const script = document.createElement("script");
      script.src = "https://docs.opencv.org/4.x/opencv.js";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("loading");
        if (window.cv && window.cv.onRuntimeInitialized) {
          window.cv.onRuntimeInitialized = () => {
            setIsLoaded(true);
            console.log("loaded from hook");
          };
        } else {
          setIsLoaded(true);
          console.log("not loaded from hook");
        }
      };
      script.onerror = () => {
        console.error("Failed to load OpenCV.js");
      };
      document.head.appendChild(script);
    } else if (window.cv) {
      setIsLoaded(true);
      console.log("wawawewe#2");
    }
  }, []);

  return isLoaded;
};

export default useOpenCVLoader;
