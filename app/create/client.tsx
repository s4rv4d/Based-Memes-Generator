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

import {
  flattenContractArgs,
  generateTokenIdAdjustedContractArgs,
  createTestZoraEditionConfig,
} from "../../hooks/useZoraCreateEdition";

export const CreatePost = () => {
  const [imageSrc, setImageSrc] = useState(null); // To store the uploaded image source
  const [cid, setCid] = useState("");
  const [args, setArgs] = useState<any[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [fileName, setFileName] = useState<string>("Based Meme");
  const [dbId, setDbId] = useState<string>("");
  const [dbPushDone, setDbPushDone] = useState<boolean>(false);

  const {
    data: hash,
    isPending,
    writeContract,
    error,
    isError,
  } = useWriteContract();
  const { address } = useAccount();
  const { creator_contract, explorer } = getContractFromChainId(5);

  const [texts, setTexts] = useState([
    {
      id: 1,
      text: "Your Text Here",
      fontName: "Impact",
      fontSize: "30",
      color: "#FFFFFF",
    },
    // Add more items as needed
  ]);

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
  };

  const imageRef = useRef(null);
  const memeRef = useRef(null);

  const updateText = (id: number, newText: string) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, text: newText } : text
    );
    setTexts(updatedTexts);
  };

  const updateTextStyle = (id: number, newStyle) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, ...newStyle } : text
    );
    setTexts(updatedTexts);
  };

  // Function to handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
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

  // On top layout
  const onResizeFirstLabel = (event, { node, size, handle }) => {
    setResizeFirstBounds({ width: size.width, height: size.height });
  };
  const onResizeSecondLabel = (event, { node, size, handle }) => {
    setResizeSecondBounds({ width: size.width, height: size.height });
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

  const exportMeme = async (e) => {
    e.preventDefault();

    if (memeRef.current) {
      html2canvas(memeRef.current, { backgroundColor: null }).then(
        async (canvas) => {
          canvas.toBlob(async (blob) => {
            if (blob) {
              // Convert the blob to a File object
              const fileName = "meme.png"; // Specify the filename
              const mimeType = "image/png"; // Specify the MIME type
              const file: File = new File([blob], fileName, { type: mimeType });

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
        }
      );
    }
  };

  const createEditionNFT = async (ipfsHash: string) => {
    setLoadingText("Creating NFT Edition.......");

    const args = flattenContractArgs(
      generateTokenIdAdjustedContractArgs(
        createTestZoraEditionConfig(ipfsHash, address),
        0
      )
    );

    setArgs(args);

    writeContract({
      // chainId: 8453,
      address: creator_contract,
      abi: ZoraAbi,
      functionName: "createEditionWithReferral",
      args: args,
      enabled: true,
    });
  };

  const postNFT = async (createrAddress: string, editionAddress: string) => {
    const res = await addDoc(collection(db, "nfts"), {
      creatorAddress: createrAddress,
      editionAddress: editionAddress,
      ipfs: `ipfs://${cid}`,
      mints: 0,
      fileName: fileName,
    });

    return res._key.path.segments[1];
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
      const editionAddress = data.logs[0].address;

      const res = await postNFT(creatorAddress, editionAddress);
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

  // useEffect(() => {
  //   if (isLoading) {
  //     // Prevent scrolling on mount
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     // Re-enable scrolling on cleanup
  //     document.body.style.overflow = "auto";
  //   }
  //   // Cleanup function to revert the overflow style back to 'auto' when the component unmounts or showCreate changes
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isLoading]);

  const handleOverlayClick = () => {
    if (dbPushDone || isReceiptError || isError) {
      setIsLoading(false);
    }
  };

  const handleModalClick = (e) => {
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
      <div
        style={{
          display: "flex", // Corresponds to `flex`
          justifyContent: "center", // Corresponds to `justify-center`
          alignItems: "center", // Corresponds to `items-center`
          height: "100vh", // Corresponds to `h-screen`, which sets the height to the full height of the viewport
        }}
      >
        <div
          style={{
            padding: 20,
            background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
            boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
            borderRadius: 25,
            overflow: "hidden",
            border: "1px #525252 solid", // shadow-xl, this is an approximation since Tailwind's shadows are predefined
            margin: "2rem auto", // mx-auto centers the element, my-8 applies vertical margin, translating to 2rem (32px) top and bottom
            maxWidth: "80rem", // max-w-7xl, Tailwind's max width classes are predefined, 112rem is an approximation for 7xl
            maxHeight: "40rem",
          }}
        >
          {/* image carousel part */}
          <ImageCarousel
            images={imageArray}
            onImageSelect={handleCarouselSelection}
            selectedIndex={selectedIndex}
          />

          <div
            style={{
              display: "flex", // Corresponds to `flex`
              width: "100%", // Corresponds to `w-full`, making the element's width 100% of its parent's width
              maxWidth: "96rem", // Corresponds to `max-w-6xl`, Tailwind's predefined max width for 6xl (this conversion assumes the default Tailwind base font size of 16px, where 1rem = 16px, so 96rem would be 1536px)
              margin: "0 auto", // Corresponds to `mx-auto`, centers the element horizontally within its parent
              gap: "20px", // Adds 20px gap between each flex item
              maxHeight: "30rem",
            }}
          >
            {/* Meme editor content */}
            <div
              style={{
                flex: 1, // Corresponds to `flex-1`, which means the element can grow and shrink, with a flex-basis of 0%
                display: "flex", // Corresponds to `flex`, making the element a flex container
                justifyContent: "center", // Corresponds to `justify-center`, centers children along the main axis (horizontally for a row direction)
                alignItems: "center", // Corresponds to `items-center`, centers children along the cross axis (vertically for a row direction)
                position: "relative", // Corresponds to `relative`, positions the element relative to its normal position
              }}
            >
              <div
                ref={memeRef}
                style={{
                  position: "relative", // Corresponds to `relative`, which sets the element's position to relative
                  userSelect: "none", // Corresponds to `user-select-none`, which prevents text selection
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc === null ? imageArray[0] : imageSrc}
                  style={{
                    width: "auto", // Corresponds to `w-auto`, allowing the element's width to adjust based on its content up to its container's width
                    maxWidth: "100%", // Corresponds to `max-w-full`, ensuring the element's maximum width does not exceed the width of its container
                    height: "30rem", // Corresponds to `h-auto`, allowing the element's height to adjust based on its content up to its container's height
                    maxHeight: "80%",
                    borderRadius: 8, // Corresponds to `max-h-full`, ensuring the element's maximum height does not exceed the height of its container
                  }}
                />

                {texts.map((text) => (
                  <TextOverlay
                    key={text.id}
                    text={text.text}
                    color={text.color}
                    fontSize={text.fontSize}
                    fontName={text.fontName}
                  />
                ))}
              </div>
            </div>

            {/* side bar stuff */}
            <div
              style={{
                borderRadius: "8px",
                border: "2px solid #525252",
                width: "28%", // w-1/3 translates to 33.333333% width of its parent
                backgroundColor: "#323232", // Replace '#yourColorCode' with the actual color value for 'bg-create-form-bg'
                padding: "1rem", // p-4 translates to padding of 1rem (16px if the base font size is 16px)
                overflowY: "auto", // overflow-y-auto enables vertical scrolling if the content overflows the element's height
                height: "auto", // Corresponds to `h-auto`, allowing the element's height to adjust based on its content up to its container's height
                maxHeight: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h1
                    style={{
                      color: "white", // text-white translates to setting the text color to white
                      fontSize: "2rem", // text-xl translates to a font size of 1.25rem (20px if the base font size is 16px)
                      marginBottom: "2rem", // mb-4 translates to a margin-bottom of 1rem (16px if the base font size is 16px)
                    }}
                  >
                    Create your meme
                  </h1>
                  <div
                    style={{
                      marginBottom: "1rem",
                      height: "auto", // Corresponds to `h-auto`, allowing the element's height to adjust based on its content up to its container's height
                      maxHeight: "40%",
                    }}
                  >
                    <div
                      style={{
                        background: "#424242",
                        borderRadius: "4px",
                        border: "2px solid #525252",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Meme name"
                        onChange={(e) => {
                          handleFileNameUpdate(e.target.value);
                        }}
                        value={fileName}
                        style={{
                          color: "#FFFFFF",
                          height: "40px",
                          width: "100%",
                          background: "#424242",
                          paddingLeft: "16px",
                        }}
                      />
                    </div>

                    {texts.map((text) => (
                      <CustomTextInput
                        key={text.id}
                        text={text.text}
                        onTextChange={(newText) => updateText(text.id, newText)}
                        onStyleChange={(newStyle) =>
                          updateTextStyle(text.id, newStyle)
                        }
                        style={{
                          fontName: text.fontName,
                          fontSize: text.fontSize,
                          color: text.color,
                        }}
                      />
                    ))}

                    <button
                      onClick={addText}
                      style={{
                        textAlign: "center",
                        color: "#5A99F2",
                        fontSize: 14,
                        fontFamily: "Inter",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      Add text +
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "12px",
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "#0252FF",
                    borderRadius: 30,
                    overflow: "hidden",
                    border: "1px #525252 solid",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    display: "inline-flex",
                    height: "50px",
                    boxSizing: "border-box",
                  }}
                >
                  <img src="base-logo.png" alt="baseLogo" layout="fill" />

                  <button
                    onClick={exportMeme}
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 14,
                      fontFamily: "Inter",
                      fontWeight: "600",
                      wordWrap: "break-word",
                      height: "50px",
                    }}
                    disabled={fileName.length === 0}
                  >
                    Mint a Meme NFT
                  </button>
                </div>
              </div>
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
