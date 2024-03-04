import React, { useState, useEffect } from "react";
import "./styles/loader.css";
import { useWaitForTransactionReceipt } from "wagmi";
import ShareButton from "./ShareOnXButton";

const Loader = ({
  loadingText,
  isCompleted,
  isError,
  txnURL,
  dbId,
}: {
  loadingText: string | undefined;
  isCompleted: boolean;
  isError: boolean;
  txnURL: string;
  dbId: string;
}) => {
  const loaderStyles = {
    position: "absolute", // Use 'absolute' if you want it relative to a container
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 1000, // Ensure it's above other content
    background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
    borderRadius: 25,
    overflow: "auto",
    border: "1px #525252 solid",
    display: "flex", // Corresponds to `flex`
    justifyContent: "center", // Corresponds to `justify-center`
    alignItems: "center",
    flexDirection: "column",
    padding: 20,
    minWidth: "200px",
    width: "auto",
    maxWidth: "700px",
    minHeight: "100px",
  };

  const animationStyles = {
    // Simple animation example
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #5A99F2",
    borderRadius: "50%",
    width: "15px",
    height: "15px",
    animation: "spin 2s linear infinite",
    justifyContent: "center",
  };

  const labelStyles = {
    color: "#fff",
    minWidth: "300px",
    width: "auto",
    maxWidth: "700px",
    height: "auto", // Height adjusts based on content
    whiteSpace: "normal", // Allows text to wrap
    overflowWrap: "break-word",
    padding: "20px",
    fontSize: 16,
    // fontFamily: "Public Sans",
    fontWeight: "400",
    wordWrap: "break-word",
  };

  return (
    <div
      style={{
        position: "absolute", // Use 'absolute' if you want it relative to a container
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 1000, // Ensure it's above other content
        background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
        boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
        borderRadius: 25,
        overflow: "auto",
        border: "1px #525252 solid",
        display: "flex", // Corresponds to `flex`
        justifyContent: "center", // Corresponds to `justify-center`
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
        minWidth: "200px",
        width: "auto",
        maxWidth: "700px",
        minHeight: "100px",
      }}
    >
      {!isCompleted && !isError && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div style={animationStyles}></div>
            <p>{loadingText}</p>
          </div>
        </>
      )}

      {isCompleted && !isError && (
        <>
          <p
            style={{
              margin: "20px",
              color: "#fff",
              fontSize: 20,
              // fontFamily: "Public Sans",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Minted!
          </p>

          <div
            style={{
              gap: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                background: "#323232",
                borderRadius: 30,
                overflow: "hidden",
                border: "1px #525252 solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <a
                href={txnURL}
                style={{
                  textAlign: "center",
                  color: "#5A99F2",
                  fontSize: 14,
                  // fontFamily: "Public Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Check transaction
              </a>
            </div>

            <ShareButton
              message="i just minted a MEME using basedMeme generator, guess I'm pretty BASED :)"
              url={`${process.env.NEXT_PUBLIC_HOST_URL}/nft/${dbId}`}
            />
          </div>
        </>
      )}

      {isError && (
        <>
          <p
            style={{
              color: "#fff",
              minWidth: "300px",
              width: "auto",
              maxWidth: "700px",
              height: "auto", // Height adjusts based on content
              whiteSpace: "normal", // Allows text to wrap
              overflowWrap: "break-word",
              padding: "20px",
              fontSize: 16,
              // fontFamily: "Public Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {loadingText}
          </p>
        </>
      )}
    </div>
  );
};

export default Loader;
