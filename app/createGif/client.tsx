/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Public_Sans } from "next/font/google";
import * as faceapi from "face-api.js";
import { processGif, getCount, useOpenCV } from "../../utils/processGIF";
import StickerModal from "../create/components/StickerModal";
import useOpenCVLoader from "@/hooks/useOpenCVLoader";
import { Blob } from "buffer";

import { ZoraAbi, getContractFromChainId } from "../../abi/zoraEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAccount } from "wagmi";
import { Address } from "viem";

import {
  flattenContractArgs,
  generateTokenIdAdjustedContractArgs,
  createTestZoraEditionConfig,
} from "../../hooks/useZoraCreateEdition";

// font stuff
const inter = Public_Sans({ subsets: ["latin"] });

// interfaces
interface ImageOverlay {
  id: number;
  image: HTMLImageElement | undefined;
  src: string | undefined;
  stickerCreator: string | undefined;
}

export const CreateGIF = () => {
  // state variables
  const [gifURLString, setGifURLString] = useState<string>("");
  const [gifArrayBuffer, setGifArrayBuffer] = useState<ArrayBuffer | undefined>(
    undefined
  );
  const [overlayCount, setOverlayCount] = useState<number>(0);
  const [imageOverlays, setImageOverlays] = useState<ImageOverlay[]>([]);
  const [gifProcessed, setGifProcessed] = useState<boolean>(false);
  const [finalGIFBlob, setFinalGIFBlob] = useState<Blob>();

  const [args, setArgs] = useState<any[] | null>(null);
  const [cid, setCid] = useState("");
  const [dbId, setDbId] = useState<string>("");
  const [dbPushDone, setDbPushDone] = useState<boolean>(false);

  const {
    data: hash,
    isPending,
    writeContract,
    error,
    isError,
  } = useWriteContract();
  const { address, isConnected } = useAccount();
  const { creator_contract, explorer } = getContractFromChainId(
    Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  );

  const allImagesSet = imageOverlays.every(
    (overlay) => overlay.image !== undefined
  );
  // const cv = useOpenCV();
  const isOpenCVLoaded = useOpenCVLoader();

  useEffect(() => {
    if (isOpenCVLoaded && window.cv) {
      const cv = window.cv;
      console.log("loaded");
      console.log(cv);
    }
  }, [isOpenCVLoaded]);

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

  const handleProcessGIF = async () => {
    const imageComponents = imageOverlays.map((overlay) => overlay.image);
    const gifResult: { gifUrl: string; blob: Blob } | undefined =
      await processGif(
        gifArrayBuffer as ArrayBuffer,
        imageComponents as HTMLImageElement[],
        cv
      );

    if (gifResult !== undefined) {
      setGifURLString(gifResult.gifUrl as string);
      setFinalGIFBlob(gifResult.blob);
      setGifProcessed(true);
    }
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
        stickerCreator: undefined,
      };

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

  const handleMintNFT = async () => {
    if (finalGIFBlob !== undefined) {
      const fileName = "basedmeme.gif";
      const mimeType = "image/gif";
      const file: File = new File([finalGIFBlob as Blob], fileName, {
        type: mimeType,
      });
      const formData = new FormData();
      formData.append("file", file, file.name); // Append the file
      formData.append("name", "Based Meme");
      formData.append("description", "meme generaterated using basedMeme");
      await uploadFile(formData);
    }
  };

  const uploadFile = async (formData: FormData) => {
    // setLoadingText("Uploading to IPFS.....");

    try {
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const ipfsHash = await res.text();
      setCid(ipfsHash);

      await createEditionNFT(`ipfs://${ipfsHash}`);
    } catch (e) {
      console.log(e);

      // setIsLoading(false);
      alert("Trouble uploading file");
    }
  };

  const createEditionNFT = async (ipfsHash: string) => {
    // setLoadingText("Creating NFT Edition.......");

    const stickerCreators = imageOverlays.map(
      (overlay) => overlay.stickerCreator
    );

    const args: any = flattenContractArgs(
      generateTokenIdAdjustedContractArgs(
        createTestZoraEditionConfig(
          ipfsHash,
          address as Address,
          stickerCreators as [Address]
        ),
        0
      )
    );

    setArgs(args);

    writeContract({
      address: creator_contract as Address,
      abi: ZoraAbi,
      functionName: "createEditionWithReferral",
      args: args,
      // enabled: true,
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
    error: reciptError,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const postNFT = async (
    createrAddress: Address | string,
    editionAddress: Address | string
  ) => {
    const res = await addDoc(
      collection(db, String(process.env.NEXT_PUBLIC_FIRESTIRE_ENDPOINT)),
      {
        creatorAddress: createrAddress,
        editionAddress: editionAddress,
        ipfs: `ipfs://${cid}`,
        mints: 0,
        fileName: "Based GIF meme",
      }
    );

    console.log(res.id);
    return res.id;
  };

  useEffect(() => {
    const post = async () => {
      const creatorAddress = address;
      const editionAddress = data?.logs[0].address;

      const res = await postNFT(
        creatorAddress as Address,
        editionAddress as Address
      );
      setDbId(res);
      setDbPushDone(true);
      // setLoadingText("Done");
      console.log(res);
    };

    if (isConfirmed) {
      post();
    }

    if (isError) {
      // alert(error);
      if (
        error?.message &&
        (error.message.includes("insufficient funds") ||
          error.message.includes("exceeds the balance of the account"))
      ) {
        // setLoadingText("Insufficient funds");
      } else if (
        error?.message &&
        (error.message.includes("User rejected the request") ||
          error.message.includes("User rejected the request"))
      ) {
        // setLoadingText("Request denied :(");
      } else {
        // setLoadingText(error?.message);
      }
    }

    if (isReceiptError) {
      // alert(reciptError);
      if (
        reciptError?.message &&
        (reciptError.message.includes("insufficient funds") ||
          reciptError.message.includes("exceeds the balance of the account"))
      ) {
        // setLoadingText("Insufficient funds");
      } else if (
        reciptError?.message &&
        (reciptError.message.includes("User rejected the request") ||
          reciptError.message.includes("User rejected the request"))
      ) {
        // setLoadingText("Request denied :(");
      } else {
        // setLoadingText(reciptError?.message);
      }
    }
  }, [isConfirmed, isError, isReceiptError]);

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
          <div className="flex flex-row justify-start items-center overflow-x-auto max-w-[800px] h-[132px] w-auto gap-4">
            {imageOverlays.map((overlay, index) => (
              <div
                key={index}
                className="relative flex flex-col flex-shrink-0 object-cover justify-center items-center w-[100px] h-[100px] bg-transparent border border-dashed rounded border-primary-border-color"
              >
                {overlay.src === undefined && (
                  <StickerModal
                    onStickerSelection={(sticker: string, creator: string) => {
                      const img = new Image();
                      img.src = sticker;
                      img.crossOrigin = "anonymous";

                      img.onload = () => {
                        let imageOverlay: ImageOverlay = {
                          id: index,
                          image: img,
                          src: sticker,
                          stickerCreator: creator,
                        };

                        handleImageOverlaySelection(index, imageOverlay);
                      };
                    }}
                  />
                )}

                {overlay.src !== undefined && (
                  <>
                    <img
                      src={overlay.src}
                      alt="sticker"
                      className="w-[80px] h-[80px]"
                    />
                    <div
                      className="absolute top-[-10px] right-[-10px] cursor-pointer"
                      onClick={() => {
                        let imageOverlay: ImageOverlay = {
                          id: index,
                          image: undefined,
                          src: undefined,
                          stickerCreator: undefined,
                        };

                        setGifProcessed(false);

                        handleImageOverlaySelection(index, imageOverlay);
                      }}
                    >
                      <img
                        src="trash.svg"
                        alt="corner sticker"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* process gif button */}
        {allImagesSet &&
          overlayCount > 0 &&
          gifArrayBuffer !== undefined &&
          gifProcessed === false && (
            <button
              className="flex-grow bg-primary-button h-[50px] cursor-pointer rounded-lg text-sm text-white font-normal"
              onClick={handleProcessGIF}
            >
              Process GIF
            </button>
          )}

        {/* mint gif button */}
        {gifProcessed === true &&
          overlayCount > 0 &&
          gifArrayBuffer !== undefined && (
            <button
              className="flex-grow flex justify-center items-center bg-primary-button h-[50px] cursor-pointer rounded-lg text-sm text-white font-normal gap-2"
              onClick={handleMintNFT}
            >
              <img src="base-logo.png" alt="baseLogo" />
              <label className="font-normal text-base">Mint on Base</label>
            </button>
          )}
      </div>
    </div>
  );
};
