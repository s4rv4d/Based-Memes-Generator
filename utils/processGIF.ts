"use client";
import { Mat, Rect } from "opencv-ts";
import * as faceapi from "face-api.js";
import GIF from "gif.js";
import { parseGIF, decompressFrames, ParsedFrame, Frame } from "gifuct-js";
import dynamic from "next/dynamic";
import useOpenCVLoader from "../hooks/useOpenCVLoader";
import { useEffect, useState } from "react";
import cv from "@techstark/opencv-js";

export const useOpenCV = () => {
  const isOpenCVLoaded = useOpenCVLoader();
  const [cv, setCv] = useState<any>(null);

  useEffect(() => {
    if (isOpenCVLoaded && window.cv) {
      setCv(window.cv);
      console.log("loaded");
    }
  }, [isOpenCVLoaded]);

  return cv;
};

interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FaceBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
}

// gif patch canvas
var tempCanvas = document.createElement("canvas");
var tempCtx = tempCanvas.getContext("2d")!;
// full gif canvas
var gifCanvas = document.createElement("canvas");
var gifCtx = gifCanvas.getContext("2d")!;
// overlay image canvas
let previousPositions: Position[] = [];
var frameImageData: ImageData;

/// helper functions
function trackFace(
  initialBox: FaceBoxType,
  previousFrame: Mat,
  currentFrame: Mat,
  cv
): FaceBoxType {
  let prevGray = new cv.Mat();
  let currGray = new cv.Mat();

  cv.cvtColor(previousFrame, prevGray, cv.COLOR_RGBA2GRAY);
  cv.cvtColor(currentFrame, currGray, cv.COLOR_RGBA2GRAY);

  let prevPoints = new cv.Mat.zeros(1, 1, cv.CV_32FC2);
  prevPoints.data32F[0] = initialBox.x + initialBox.width / 2;
  prevPoints.data32F[1] = initialBox.y + initialBox.height / 2;

  let nextPoints = new cv.Mat();
  let status = new cv.Mat();
  let err = new cv.Mat();

  let winSize = new cv.Size(15, 15);
  let maxLevel = 2;
  let criteria = new cv.TermCriteria(
    cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT,
    10,
    0.03
  );

  cv.calcOpticalFlowPyrLK(
    prevGray,
    currGray,
    prevPoints,
    nextPoints,
    status,
    err,
    winSize,
    maxLevel,
    criteria
  );

  let newX = nextPoints.data32F[0] - initialBox.width / 2;
  let newY = nextPoints.data32F[1] - initialBox.height / 2;

  prevGray.delete();
  currGray.delete();
  prevPoints.delete();
  nextPoints.delete();
  status.delete();
  err.delete();

  return {
    x: newX,
    y: newY,
    width: initialBox.width,
    height: initialBox.height,
  };
}

async function drawPatch(frame: ParsedFrame) {
  var dims = frame.dims;

  if (
    !frameImageData ||
    dims.width != frameImageData.width ||
    dims.height != frameImageData.height
  ) {
    tempCanvas.width = dims.width;
    tempCanvas.height = dims.height;
    frameImageData = tempCtx.createImageData(dims.width, dims.height);
  }

  // set the patch data as an override
  frameImageData.data.set(frame.patch);

  tempCtx.putImageData(frameImageData, 0, 0);
  gifCtx.drawImage(tempCanvas, 0, 0);
}

function drawOverlay(
  detections: FaceBoxType[],
  overlayImages: HTMLImageElement[]
) {
  detections.forEach((detection, index) => {
    console.log("index: ", index, overlayImages[index]);

    var overlayCanvas = document.createElement("canvas");
    var overlayCtx = overlayCanvas.getContext("2d")!;

    overlayCanvas.width = tempCanvas.width;
    overlayCanvas.height = tempCanvas.height;

    // Use the previous position for overlay placement
    const overlayX = detection.x - detection.height / 2;
    const overlayY = detection.y - detection.height / 2;

    overlayCtx.clearRect(
      overlayX,
      overlayY,
      detection.height * 2,
      detection.height * 2
    );
    overlayCtx.drawImage(
      overlayImages[index],
      overlayX,
      overlayY,
      detection.height * 2,
      detection.height * 2
    );
    gifCtx.drawImage(overlayCanvas, 0, 0);
  });
}

export const getCount = async (gifBuffer: ArrayBuffer): Promise<number> => {
  const gif = parseGIF(gifBuffer);
  const decompressedFrames = decompressFrames(gif, true);
  let firstFrame: ParsedFrame = decompressedFrames[0];
  var testFrameImageData: ImageData;

  var tempCanvas = document.createElement("canvas");
  var tempCtx = tempCanvas.getContext("2d")!;

  var dims = firstFrame.dims;

  if (
    !testFrameImageData ||
    dims.width != testFrameImageData.width ||
    dims.height != testFrameImageData.height
  ) {
    tempCanvas.width = dims.width;
    tempCanvas.height = dims.height;
    testFrameImageData = tempCtx.createImageData(dims.width, dims.height);
  }

  // set the patch data as an override
  testFrameImageData.data.set(firstFrame.patch);

  tempCtx.putImageData(testFrameImageData, 0, 0);

  const faceBoxes = await faceapi
    .detectAllFaces(tempCanvas, new faceapi.SsdMobilenetv1Options())
    .run();

  console.log(faceBoxes.length);

  return faceBoxes.length;
};

export const processGif = async (
  gifBuffer: ArrayBuffer,
  overlayImages: HTMLImageElement[],
  cv: any
): Promise<{ gifUrl: string; blob: Blob } | undefined> => {
  const cvModule = cv;

  const gif = parseGIF(gifBuffer);

  const gifWriter = new GIF({
    workers: 2,
    quality: 10,
    width: gif.lsd.width,
    height: gif.lsd.height,
    debug: true,
  });

  gifCanvas.width = gif.lsd.width;
  gifCanvas.height = gif.lsd.height;

  const decompressedFrames = decompressFrames(gif, true);

  let index = 0;
  let faceBox: FaceBoxType[] = [];
  let previousFrame: Mat;
  for (const frame of decompressedFrames) {
    if (frame.disposalType === 2) {
      gifCtx.clearRect(0, 0, frame.dims.width, frame.dims.height);
    }

    await drawPatch(frame);

    const prevImageData = gifCtx.getImageData(
      0,
      0,
      frame.dims.width,
      frame.dims.height
    );

    let currentFrame = cvModule.matFromImageData(prevImageData);

    if (faceBox.length == 0) {
      const faceBoxes = await faceapi
        .detectAllFaces(tempCanvas, new faceapi.SsdMobilenetv1Options())
        .run();
      faceBox = faceBoxes.map((detection) => {
        return {
          x: detection.box.x,
          y: detection.box.y,
          width: detection.box.width,
          height: detection.box.height,
        };
      });
    } else {
      faceBox = faceBox.map((face) => {
        return trackFace(face, previousFrame, currentFrame, cvModule);
      });
    }

    await drawOverlay(faceBox, overlayImages);

    previousFrame = currentFrame;

    const afterImageData = gifCtx.getImageData(
      0,
      0,
      frame.dims.width,
      frame.dims.height
    );

    gifWriter.addFrame(afterImageData, {
      delay: frame.delay,
      copy: true,
      dispose: 2,
    });

    index++;
  }

  return new Promise<{ gifUrl: string; blob: Blob }>((resolve, reject) => {
    gifWriter.on("finished", (blob: Blob) => {
      const gifUrl = URL.createObjectURL(blob);

      // resolve(gifUrl);
      resolve({ gifUrl, blob });
    });
    gifWriter.on("abort", () => {
      reject("failed to render gif");
      console.log(`error: ${reject}`);
    });
    gifWriter.render();
  });
};
