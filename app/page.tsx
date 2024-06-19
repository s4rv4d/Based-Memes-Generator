"use client";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import { useState, useEffect } from "react";
import Page from "./create/page";
import PageGIF from "./createGif/page";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateGIF, setShowCreateGIF] = useState(false);

  const showCreateView = () => {
    setShowCreate((prevShowCreate) => !prevShowCreate);
  };

  const showCreateGifView = () => {
    setShowCreateGIF((prev) => !prev);
  };

  useEffect(() => {
    if (showCreate || showCreateGIF) {
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
  }, [showCreate, showCreateGIF]);

  // Function to close the modal when the overlay is clicked
  const handleOverlayClick = () => {
    setShowCreate(false);
    setShowCreateGIF(false);
  };

  // Function to stop the click event from bubbling up to the overlay
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <main
        style={{
          position: "relative",
          zIndex: 10, // Ensure this is higher than other content but lower than the overlay
        }}
      >
        <div className="bg-custom-black bg-gradient-to-r from-custom-blue via-custom-black to-custom-black">
          <Header />
          <Hero
            showCreateView={showCreateView}
            showCreateGIF={showCreateGifView}
          />
        </div>
        <Gallery />
        <Footer />
      </main>
      {showCreate && (
        <div
          className="fixed inset-y-0 w-full h-full bg-overlay-background z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div onClick={handleModalClick}>
            <Page />
          </div>
        </div>
      )}

      {showCreateGIF && (
        <div
          className="fixed inset-y-0 w-full h-full bg-overlay-background z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div onClick={handleModalClick}>
            <PageGIF />
          </div>
        </div>
      )}
    </>
  );
}
