"use client";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import html2canvas from "html2canvas";
import { blob } from "stream/consumers";
import { ZoraAbi, getContractFromChainId } from "../../abi/zoraEdition";
import { z } from "zod";
import { Decimal } from "decimal.js";
import { useSimulateContract, useWriteContract } from "wagmi";
import ImageCarousel from "@/components/imageCarousel";
import "./resizalble-style.css";
import TextOverlay from "@/components/TextOverlay";
import CustomTextInput from "@/components/CustomTextInput";

import {
  flattenContractArgs,
  generateTokenIdAdjustedContractArgs,
  createTestZoraEditionConfig,
} from "../../hooks/useZoraCreateEdition";

export const CreatePost = () => {
  const [imageSrc, setImageSrc] = useState(null); // To store the uploaded image source
  const [topText, setTopText] = useState(""); // To store the top text
  const [bottomText, setBottomText] = useState(""); // To store the bottom text
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [resizeFirstBounds, setResizeFirstBounds] = useState({
    width: 200,
    height: 200,
  });
  const [resizeSecondBounds, setResizeSecondBounds] = useState({
    width: 200,
    height: 200,
  });
  // const [file, setFile] = useState(new Blob());
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [editionSlot, setEditionSlot] = useState<number | null>(null);

  // TESTING TEXT OVERLAY
  // const [texts, setTexts] = useState([{ id: 1, text: "Test", x: 50, y: 50 }]);
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

  // const updateText = (id, newText) => {
  //   const updatedTexts = texts.map((text) =>
  //     text.id === id ? { ...text, text: newText } : text
  //   );
  //   setTexts(updatedTexts);
  // };

  // Function to handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCarouselSelection = ({ index }: { index: number }) => {
    const file = imageArray[index];
    setImageSrc(file);
  };

  // On top layout
  const onResizeFirstLabel = (event, { node, size, handle }) => {
    setResizeFirstBounds({ width: size.width, height: size.height });
  };
  const onResizeSecondLabel = (event, { node, size, handle }) => {
    setResizeSecondBounds({ width: size.width, height: size.height });
  };

  const uploadFile = async (formData: FormData) => {
    try {
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      // const resp = await res.text();
      const ipfsHash = await res.text();
      console.log("ipfs hash ", ipfsHash);
      setCid(ipfsHash);
      // setUploading(false);

      await createEditionNFT(`ipfs://${ipfsHash}`);
    } catch (e) {
      console.log(e);
      // setUploading(false);
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
              formData.append("name", "testing");
              formData.append("description", "sarvad");

              console.log("file here", file);
              await uploadFile(formData);
            }
          }, "image/png");
        }
      );
    }
  };

  // const { writeContract } = useWriteContract();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const createEditionNFT = async (ipfsHash: string) => {
    const { creator_contract, explorer } = getContractFromChainId(84531);

    writeContract({
      // chainId: chainId,
      address: creator_contract,
      abi: ZoraAbi,
      functionName: "createEditionWithReferral",
      args: flattenContractArgs(
        generateTokenIdAdjustedContractArgs(
          createTestZoraEditionConfig(ipfsHash),
          0
        )
      ),
      enabled: true,
    });
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
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-create-form-bg rounded-lg shadow-xl mx-auto my-8 max-w-7xl">
          <ImageCarousel
            images={imageArray}
            onImageSelect={handleCarouselSelection}
          />
          <div className="flex w-full max-w-6xl mx-auto">
            <div className="flex-1 flex justify-center items-center relative">
              {/* Meme editor content */}
              <div ref={memeRef} className="relative user-select-none">
                <img
                  ref={imageRef}
                  src={
                    imageSrc === null
                      ? "meme-templates/always-has-been.jpg"
                      : imageSrc
                  }
                  alt="Meme"
                  className="w-auto max-w-full h-auto max-h-full"
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

            <div className="w-1/3 bg-create-form-bg p-4 overflow-y-auto h-[500px]">
              <h1 className="text-white text-xl mb-4">Meme Generator</h1>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-2"
                />
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
                  onClick={exportMeme}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Export Meme
                </button>
                {/* test adding new text overlays */}
                <button
                  onClick={addText}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add text
                </button>
              </div>
            </div>

            {/* <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
              <h1 className="text-white text-xl mb-4">Meme Generator</h1>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-2"
                />
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
                  onClick={exportMeme}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Export Meme
                </button>
                <button
                  onClick={addText}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add text
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

/* {hash && (
                <div className="text-pink-500">Transaction Hash: {hash}</div>
              )} */
