/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import { Public_Sans } from "next/font/google";
import * as faceapi from "face-api.js";
import { processGif, getCount } from "../../utils/processGIF";

// font stuff
const inter = Public_Sans({ subsets: ["latin"] });

// interfaces
interface ImageOverlay {
  id: number;
  image: HTMLImageElement | undefined;
  src: string | undefined;
}

export const CreateGIF = () => {
  // state variables
  const [gifURLString, setGifURLString] = useState<string>("");
  const [gifArrayBuffer, setGifArrayBuffer] = useState<ArrayBuffer | undefined>(
    undefined
  );
  const [overlayCount, setOverlayCount] = useState<number>(0);
  const [imageOverlays, setImageOverlays] = useState<ImageOverlay[]>([]);

  // helper functions
  const handleImageOverlaySelection = (
    index: number,
    newOverlay: ImageOverlay
  ) => {
    setImageOverlays((prevOverlays) => {
      const updatedOverlays = [...prevOverlays];

      if (index < updatedOverlays.length) {
        // If the index exists, update the existing overlay
        updatedOverlays[index] = newOverlay;
      } else {
        // If the index does not exist, append the new overlay
        updatedOverlays.push(newOverlay);
      }

      return updatedOverlays;
    });
  };

  const handleGIFUrlChange = (urlstring: string) => {
    console.log("url change: ", urlstring);
    setGifURLString(urlstring);
  };

  const importGifClicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Import clicked");
    const file = e.target.files?.[0];
    if (!file) {
      // error messaging
      console.log("error selecting gif");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    setGifArrayBuffer(arrayBuffer);
    const ocount = await getCount(arrayBuffer);

    let tempArray: ImageOverlay[] = [];
    for (let i: number = 0; i < ocount; i++) {
      let imageOverlay: ImageOverlay = {
        id: i,
        image: undefined,
        src: undefined,
      };

      // handleImageOverlaySelection(i, imageOverlay);
      tempArray.push(imageOverlay);
    }

    setImageOverlays((prev) => tempArray);
    setOverlayCount(ocount);

    // temp display
    if (file) {
      const url = URL.createObjectURL(file);
      setGifURLString(url);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.loadFaceRecognitionModel("/models");
    };

    loadModels();
  }, []);

  return (
    <div className="flex flex-col justify-center ${inter.className}">
      <div className="flex flex-col justify-start gap-4 rounded-lg bg-card-background shadow-custom-box-shadow w-[800px] h-auto p-4">
        {/* Title label */}
        <label className="text-base text-white font-medium">
          GIF Meme Editor
        </label>
        {/* gif input box */}
        <div className="flex flex-row bg-transparent h-10 gap-2">
          {/* gif input field */}
          <input
            className="flex-grow bg-transparent text-base text-white font-normal p-2 border border-primary-border-color rounded-lg"
            type="text"
            onChange={(e) => {
              handleGIFUrlChange(e.target.value);
            }}
            placeholder="Enter GIF url"
          />

          <input
            type="file"
            accept="image/gif"
            onChange={importGifClicked}
            style={{ display: "none" }}
            id="tempInput"
          />

          {/* gif add option */}
          <label
            className="bg-[#323232] rounded-lg flex flex-col justify-center"
            htmlFor="tempInput"
          >
            <div className="mx-3 my-[10px] flex flex-row justify-center items-center gap-1 cursor-pointer">
              <img src="addTemp.svg" alt="text" />
              <label className=" text-xs font-normal cursor-pointer">
                Import GIF
              </label>
            </div>
          </label>
        </div>

        {gifArrayBuffer === undefined && (
          /* gif empty state display box */
          <div className="flex flex-col justify-center items-center w-auto h-[307px] bg-transparent gap-3">
            <label className="text-2xl text-primary-border-color font-medium">
              Nothing here
            </label>
            <label className="text-base text-primary-border-color font-thin">
              Add a gif to edit :)
            </label>
          </div>
        )}
        {gifArrayBuffer !== undefined && (
          /* gif empty state display box */
          <div className="flex flex-col justify-center items-center w-auto h-[307px] bg-transparent rounded-lg">
            {gifURLString && <img src={gifURLString} alt="Processed GIF" />}
          </div>
        )}

        {overlayCount > 0 && gifArrayBuffer !== undefined && (
          <div className="flex flex-row justify-start items-center overflow-x-auto max-w-[800px] h-[132px] w-auto gap-2">
            {imageOverlays.map((overlay, index) => (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 object-cover justify-center items-center w-[100px] h-[100px] bg-transparent border border-dashed rounded border-primary-border-color"
              >
                <p>{overlay.image === undefined ? "+" : "Image"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
