/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { ZoraAbi, getContractFromChainId } from "../../abi/zoraEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import ImageCarousel from "@/components/imageCarousel";
import "./resizalble-style.css";
import TextOverlay from "@/components/TextOverlay";
import CustomTextInput from "@/components/CustomTextInput";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import Loader from "@/components/loader";
import { Address } from "viem";
import ImageOverlay from "@/components/ImageOverlay";
import { saveAs } from "file-saver";
import { Public_Sans } from "next/font/google";
import { WalletOptions } from "@/utils/wallet-options";
import SketchExample from "@/components/SketchExample";

import {
  flattenContractArgs,
  generateTokenIdAdjustedContractArgs,
  createTestZoraEditionConfig,
} from "../../hooks/useZoraCreateEdition";

const inter = Public_Sans({ subsets: ["latin"] });

export const CreatePost = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null); // To store the uploaded image source
  const [cid, setCid] = useState("");
  const [args, setArgs] = useState<any[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string | undefined>(
    "Loading..."
  );
  const [fileName, setFileName] = useState<string>("Based Meme");
  const [dbId, setDbId] = useState<string>("");
  const [dbPushDone, setDbPushDone] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isResizable, setIsResizable] = useState<boolean>(true);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [dowFinal, setDwFinal] = useState<boolean>(false);
  const [mintFinal, setMintFinal] = useState<boolean>(false);

  // https://warpcast.com/~/compose?text=Hello%20world!

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

  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);

  // function to create new texts
  const addText = () => {
    const newText = {
      id: texts.length + 1,
      text: "New Text",
      x: 100,
      y: 100,
      fontName: "Impact",
      fontSize: "30",
      color: "#FFFFFF",
    };
    setTexts([...texts, newText]);
    setIsFinal(false);
    setIsEditable(false);
  };

  const imageRef = useRef(null);
  const memeRef = useRef(null);

  // Function to handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: images.length + 1,
        src: reader.result,
      };

      console.log(e.target.files[0]);

      setIsFinal(false);
      setIsEditable(false);
      setImages([...images, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const handleFileNameUpdate = (fileName: string) => {
    setFileName(fileName);
  };

  const handleCarouselSelection = ({ index }: { index: number }) => {
    const file = imageArray[index];
    setImageSrc(file);
    setSelectedIndex(index);
  };

  const uploadFile = async (formData: FormData) => {
    setLoadingText("Uploading to IPFS.....");

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

      setIsLoading(false);
      alert("Trouble uploading file");
    }
  };

  const downloadImage = async (e: any) => {
    e.preventDefault();
    setIsFinal(true);
    setIsEditable(true);
    setDwFinal(true);
  };

  useEffect(() => {
    if (dowFinal) {
      if (memeRef.current) {
        html2canvas(document.getElementById("imageWithText"), {
          backgroundColor: null,
          useCORS: true,
          scale: 1,
        })
          .then(async (canvas) => {
            const dataURL = canvas.toDataURL();

            // Create a temporary link element
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "basedMeme.png"; // Filename
            link.click();
          })
          .then(() => {
            setDwFinal(false);
          });
      }
    }
  }, [dowFinal]);

  const exportMeme = async (e: any) => {
    e.preventDefault();
    setIsFinal(true);
    setIsEditable(true);
    setMintFinal(true);
  };

  useEffect(() => {
    if (mintFinal) {
      if (memeRef.current) {
        html2canvas(document.getElementById("imageWithText"), {
          backgroundColor: null,
          useCORS: true,
          scale: 1,
        })
          .then(async (canvas) => {
            canvas.toBlob(async (blob) => {
              if (blob) {
                // Convert the blob to a File object
                const fileName = "meme.png"; // Specify the filename
                const mimeType = "image/png"; // Specify the MIME type
                const file: File = new File([blob], fileName, {
                  type: mimeType,
                });
                const formData = new FormData();
                formData.append("file", file, file.name); // Append the file
                formData.append("name", "Based Meme");
                formData.append(
                  "description",
                  "meme generaterated using basedMeme"
                );
                setIsLoading(true);
                setLoadingText("Generating meme.....");
                await uploadFile(formData);
              }
            }, "image/png");
          })
          .then(() => {
            setMintFinal(false);
          });
      }
    }
  }, [mintFinal]);

  const createEditionNFT = async (ipfsHash: string) => {
    setLoadingText("Creating NFT Edition.......");

    const args: any = flattenContractArgs(
      generateTokenIdAdjustedContractArgs(
        createTestZoraEditionConfig(ipfsHash, address as Address),
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
        fileName: fileName,
      }
    );

    console.log(res.id);
    return res.id;
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
      setLoadingText("Done");
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
        setLoadingText("Insufficient funds");
      } else if (
        error?.message &&
        (error.message.includes("User rejected the request") ||
          error.message.includes("User rejected the request"))
      ) {
        setLoadingText("Request denied :(");
      } else {
        setLoadingText(error?.message);
      }
    }

    if (isReceiptError) {
      // alert(reciptError);
      if (
        reciptError?.message &&
        (reciptError.message.includes("insufficient funds") ||
          reciptError.message.includes("exceeds the balance of the account"))
      ) {
        setLoadingText("Insufficient funds");
      } else if (
        reciptError?.message &&
        (reciptError.message.includes("User rejected the request") ||
          reciptError.message.includes("User rejected the request"))
      ) {
        setLoadingText("Request denied :(");
      } else {
        setLoadingText(reciptError?.message);
      }
    }
  }, [isConfirmed, isError, isReceiptError]);

  const handleOverlayClick = () => {
    if (dbPushDone || isReceiptError || isError) {
      setIsLoading(false);
    }
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const imageArray = [
    "meme-templates/matrix-morpheus.jpg",
    "meme-templates/batman-slapping-robin.jpg",
    "meme-templates/captain-picard-facepalm.jpg",
    "meme-templates/x-x-everywhere.jpg",
    "meme-templates/always-has-been.jpg",
    "meme-templates/anakin-padme.jpg",
    "meme-templates/bad-luck-brian.jpg",
    "meme-templates/car-drift.jpg",
    "meme-templates/disaster-girl.jpg",
    "meme-templates/this-is-fine.jpg",
    "meme-templates/drake-hotline-bling.jpg",
    "meme-templates/gibson-jesus.jpg",
    "meme-templates/i-dont-always.jpg",
    "meme-templates/nervous.jpg",
    "meme-templates/office-congrats.jpg",
    "meme-templates/sad-pablo-escobar.jpg",
    "meme-templates/say-that-again-i-dare-you.jpg",
    "meme-templates/success-kid.jpg",
    "meme-templates/think-about-it.jpg",
    "meme-templates/two-buttons.jpg",
    "meme-templates/change-my-mind.jpg",
    "meme-templates/ben-affleck-smoking.jpg",
    "meme-templates/monk-temptation.jpg",
    "meme-templates/sparta-leonidas.jpg",
    "meme-templates/i-see-dead-people.jpg",
    "meme-templates/distracted-boyfriend.jpg",
    "meme-templates/finding-neverland.jpg",
    "meme-templates/leonardo-dicaprio-cheers.jpg",
    "meme-templates/you-guys-are-getting-paid.png",
    "meme-templates/star-wars-yoda.jpg",
    "meme-templates/drowning-kid-in-the-pool.jpg",
    "meme-templates/i-bet-hes-thinking-about-other-women.jpg",
    "meme-templates/one-does-not-simply.jpg",
    "meme-templates/hide-the-pain-harold.jpg",
    "meme-templates/laughing-leo.png",
    "meme-templates/whisper-and-goosebumps.jpg",
    "meme-templates/toilet_guy.jpg",
    "meme-templates/monkey_puppet.jpg",
    "meme-templates/water-tank-leaking-fix.png",
    "meme-templates/waiting-skeleton.jpg",
    "meme-templates/sweating-bullets.jpg",
    "meme-templates/milk-girls.jpg",
    "meme-templates/knight-with-arrow-in-helmet.jpg",
    "meme-templates/bell-curve.jpg",
    "meme-templates/grinning-girl.jpg",
    "meme-templates/shirley-temple-laugh.png",
    "meme-templates/greta-thunberg-how-dare-you.jpg",
    "meme-templates/girls-gossiping.jpg",
    "meme-templates/plague-hackers.jpg",
    "meme-templates/hack-the-planet.jpg",
    "meme-templates/obama-medal.jpg",
    "meme-templates/jurassic-park-no-one-cares.jpg",
    "meme-templates/tell-me-the-truth-I-am-ready-to-hear-it.png",
    "meme-templates/group-therapy.jpg",
  ];

  return (
    <>
      <div className="flex items-center justify-center overflow-auto ${inter.className}">
        <div className="w-1/2 min-[350px]:w-[40%] h-1/2">
          <div
            className="inline-block flex flex-col justify-center overflow-hidden gap-4 p-4"
            style={{
              background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
              borderRadius: 25,
              overflow: "hidden",
              border: "1px #525252 solid",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  color: "white", // text-white translates to setting the text color to white
                  fontSize: "40px",
                }}
              >
                {fileName}
              </h1>

              <div className="flex flex-row gap-4">
                <button
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "transparent",
                    border: "1px #525252 solid",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px",
                  }}
                  onClick={addText}
                >
                  <img
                    src="add_text.svg"
                    alt="text"
                    // style={{ height: "38px", width: "38px" }}
                  />
                </button>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="fileInput"
                />

                {/* Image button for selecting file */}
                <label
                  htmlFor="fileInput"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "transparent",
                    border: "1px #525252 solid",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px",
                  }}
                >
                  <img
                    src="add_image.svg" // Path to your image button
                    alt="Upload Image"
                    style={{
                      cursor: "pointer",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </label>

                <button
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "transparent",
                    border: "1px #525252 solid",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "4px",
                  }}
                  onClick={() => {
                    setIsEditable((prev) => !prev);
                    setIsResizable((prev) => !prev);
                    setIsFinal(false);
                  }}
                >
                  <img
                    src="settings.svg"
                    alt="text"
                    // style={{ height: "38px", width: "38px" }}
                  />
                </button>
              </div>
            </div>

            <div className="">
              {/* Meme editor content */}
              <div>
                <div
                  className="flex items-center justify-center "
                  style={{
                    userSelect: "none",
                    margin: "16px",
                  }}
                >
                  <div
                    id="imageWithText"
                    ref={memeRef}
                    style={{
                      borderRadius: 8,
                      width: "450px",
                      maxHeight: "500px",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // position: "absolute",
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={imageSrc === null ? imageArray[0] : imageSrc}
                      style={{
                        borderRadius: 8,
                        width: "auto",
                        maxHeight: "500px",
                        height: "auto",
                      }}
                      draggable="false"
                    />

                    {texts.map((text) => (
                      <TextOverlay
                        key={text.id}
                        text={text.text}
                        color={text.color}
                        fontSize={text.fontSize}
                        fontName={text.fontName}
                        onDragStop={null}
                        onResizeStop={null}
                        isEditable={isEditable}
                        isResizable={isResizable}
                        isFinal={isFinal}
                      />
                    ))}

                    {images.map((image) => (
                      <ImageOverlay
                        key={image.id}
                        src={image.src}
                        isEditable={isEditable}
                        isResizable={isResizable}
                        isFinal={isFinal}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* image carousel part */}
            <ImageCarousel
              images={imageArray}
              onImageSelect={handleCarouselSelection}
              selectedIndex={selectedIndex}
            />

            <input
              type="text"
              placeholder="Meme name"
              onChange={(e) => {
                handleFileNameUpdate(e.target.value);
              }}
              value={fileName}
              style={{
                color: "#FFFFFF",
                height: "50px",
                width: "100%",
                background: "#424242",
                border: "1px #525252 solid",
                borderRadius: "12px",
                paddingLeft: "16px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",

                // justifyContent: "space-evenly",
              }}
            >
              {isConnected && (
                <>
                  <div
                    style={{
                      flex: "1",
                      marginTop: "auto",
                      marginBottom: "12px",
                      paddingLeft: 32,
                      paddingRight: 32,
                      paddingTop: 12,
                      paddingBottom: 12,
                      background: "#0252FF",
                      borderRadius: "12px",
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      display: "inline-flex",
                      height: "50px",
                      boxSizing: "border-box",
                    }}
                  >
                    <img src="downloadIcon.svg" alt="download" />

                    <button
                      onClick={downloadImage}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14,
                        // fontFamily: "Public Sans",
                        fontWeight: "600",
                        wordWrap: "break-word",
                        height: "50px",
                      }}
                      disabled={fileName.length === 0}
                    >
                      Download Meme
                    </button>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      marginTop: "auto",
                      marginBottom: "12px",
                      paddingLeft: 32,
                      paddingRight: 32,
                      paddingTop: 12,
                      paddingBottom: 12,
                      background: "#0252FF",
                      borderRadius: "12px",
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      display: "inline-flex",
                      height: "50px",
                      boxSizing: "border-box",
                    }}
                  >
                    <img src="base-logo.png" alt="baseLogo" />

                    <button
                      onClick={exportMeme}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14,
                        // fontFamily: "Public Sans",
                        fontWeight: "600",
                        wordWrap: "break-word",
                        height: "50px",
                      }}
                      disabled={fileName.length === 0}
                    >
                      Mint Meme
                    </button>
                  </div>
                </>
              )}

              {!isConnected && <WalletOptions />}
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div onClick={handleModalClick}>
            <Loader
              loadingText={loadingText}
              isCompleted={dbPushDone}
              isError={
                isError ? isError : isReceiptError ? isReceiptError : false
              }
              txnURL={explorer + `/tx/${hash}`}
              dbId={dbId}
            />
          </div>
        </div>
      )}
    </>
  );
};
