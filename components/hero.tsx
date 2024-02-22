"use client";
import React from "react";
import Link from "next/link";

export default function Hero({ showCreateView }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div
            style={{
              marginBottom: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: 40,
                fontFamily: "Inter",
                fontWeight: "700",
                lineHeight: "50px",
                wordWrap: "break-word",
              }}
            >
              Craft Your Humour, Mint Your NFT
              {/* <br className="hidden lg:inline-block">readymade gluten */}
            </h1>
            <p
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Inter",
                fontWeight: "400",
                lineHeight: "27px",
                wordWrap: "break-word",
              }}
            >
              Transform Your Wit into Digital Art with Our Playful Crypto
              Creation Platform!
            </p>
          </div>
          <div className="flex justify-center">
            <div
              style={{
                width: "252px",
                height: "48px",
                paddingLeft: 32,
                paddingRight: 32,
                paddingTop: 12,
                paddingBottom: 12,
                background: "#5A99F2",
                borderRadius: 30,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <button
                draggable={false}
                onClick={showCreateView}
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Inter",
                  fontWeight: "600",
                  lineHeight: 24,
                  wordWrap: "break-word",
                }}
              >
                Choose Meme Template
              </button>
            </div>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://i.postimg.cc/JnzWGTJY/Group-4.png"
          />
        </div>
      </div>
    </section>
  );
}
