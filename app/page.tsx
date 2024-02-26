"use client";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import { useState, useEffect } from "react";
import Page from "./create/page";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);

  const showCreateView = () => {
    setShowCreate((prevShowCreate) => !prevShowCreate);
  };

  useEffect(() => {
    if (showCreate) {
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
  }, [showCreate]);

  // Function to close the modal when the overlay is clicked
  const handleOverlayClick = () => {
    setShowCreate(false);
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
          <Hero showCreateView={showCreateView} />
        </div>
        <Gallery />
        <Footer />
      </main>
      {showCreate && (
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
            <Page />
          </div>
        </div>
      )}
    </>
  );
}
