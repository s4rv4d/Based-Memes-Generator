import React from "react";
import { db } from "../app/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import "./styles/gallery.css";
import Page from "../app/post/page";
import NFTPost from "./NFTPost";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

export default function Gallery() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [showPost, setShowPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Nft | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, String(process.env.NEXT_PUBLIC_FIRESTIRE_ENDPOINT))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray: Nft[] = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id });
      });

      setNfts((prevItemArray) => itemsArray);
    });

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
          <div className="flex flex-col text-left w-full mb-20">
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
              <div className="columns-4 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4">
                {nfts.map((nft, index) => (
                  <NFTPost
                    key={index}
                    index={index}
                    nft={nft}
                    showPostView={showPostView}
                    setPost={(nft: Nft) => {
                      setSelectedPost(nft);
                    }}
                  />
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
            <Page params={{ item: selectedPost }} />
          </div>
        </div>
      )}
    </>
  );
}
