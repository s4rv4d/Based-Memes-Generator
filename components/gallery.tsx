import React, { use } from "react";
import { db } from "../app/firebase";
import { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import "./styles/gallery.css";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import Page from "../app/post/page";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  // mints: number;
}

export default function Gallery() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [showPost, setShowPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Nft | null>(null);

  useEffect(() => {
    const q = query(collection(db, "nfts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray: Nft[] = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id });
      });

      // console.log(typeof itemsArray);

      setNfts((prevItemArray) => itemsArray);

      // console.log(nfts);
    });

    // test();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showPost) {
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling on cleanup
      document.body.style.overflow = "auto";
    }

    // Cleanup function to revert the overflow style back to 'auto' when the component unmounts or showCreate changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPost]);

  const showPostView = () => {
    setShowPost((prevShowPost) => !prevShowPost);
  };

  const handleOverlayClick = () => {
    setShowPost(false);
    setSelectedPost(null);
  };

  // Function to stop the click event from bubbling up to the overlay
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <section
        className="text-gray-600 body-font"
        style={{
          position: "relative",
          zIndex: 10, // Ensure this is higher than other content but lower than the overlay
        }}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Recent Creations
            </h1>
          </div>
          <div
            style={{
              display: "flex", // Converts 'flex'
              flexWrap: "wrap", // Converts 'flex-wrap'
              margin: "-1rem",
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                padding: "2rem", // Converts 'p-4' assuming 1rem = 16px, and '4' in Tailwind corresponds to 1rem
              }}
            >
              <div
                style={{
                  display: "flex", // Converts 'flex'
                  position: "relative", // Converts 'relative'
                }}
              >
                {nfts.map((nft, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 20,
                      background:
                        "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
                      boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
                      borderRadius: 25,
                      overflow: "hidden",
                      border: "1px #525252 solid",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: 10,
                      display: "inline-flex",
                      flexDirection: "column",
                      margin: "16px",
                    }}
                    onClick={() => {
                      showPostView();
                      setSelectedPost(nft);
                    }}
                  >
                    <div
                      style={{
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          color: "#CDCDD0",
                          fontSize: 16,
                          fontFamily: "Inter",
                          fontWeight: "600",
                          // lineHeight: 24,
                          wordWrap: "break-word",
                        }}
                      >
                        Drake Hotline Bling
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#A6A6B0",
                            fontSize: 12,
                            fontFamily: "Inter",
                            fontWeight: "400",
                            // lineHeight: 18,
                            wordWrap: "break-word",
                          }}
                        >
                          Added by{" "}
                        </span>
                        <span
                          style={{
                            color: "#A6A6B0",
                            fontSize: 12,
                            fontFamily: "Inter",
                            fontWeight: "600",
                            // lineHeight: 18,
                            wordWrap: "break-word",
                          }}
                        >
                          Based Meme · 0 mints
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "white",
                        borderRadius: 8,
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "inline-flex",
                      }}
                    >
                      <img
                        className="nft-image"
                        src={parseIpfsUrl(nft.ipfs).gateway}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPost && selectedPost && (
        <div
          style={{
            position: "fixed", // or 'absolute' depending on your needs
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)", // Example semi-transparent background
            zIndex: 1000, // High z-index to overlay on top of everything
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleOverlayClick}
        >
          <div onClick={handleModalClick}>
            <Page item={selectedPost} />
          </div>
        </div>
      )}
    </>
  );
}
