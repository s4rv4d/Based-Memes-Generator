"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";

interface StickerModalType {
  onStickerSelection: (sticker: string) => void;
}

interface StickerDataType {
  community: string;
  stickerURL: string;
  verified: boolean;
  creator: string;
}

const StickerModal: React.FC<StickerModalType> = ({ onStickerSelection }) => {
  const [open, setOpen] = useState<boolean>(false);

  const newStickerArray: [StickerDataType] = [
    {
      community: "random",
      stickerURL: "stickers/sticker0.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker1.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker2.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker3.svg",
      verified: true,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker4.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker5.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker6.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker7.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker8.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker9.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker10.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker11.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker12.svg",
      verified: true,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker13.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker14.svg",
      verified: false,
      creator: "sarvad",
    },
    {
      community: "random",
      stickerURL: "stickers/sticker15.svg",
      verified: false,
      creator: "sarvad",
    },
  ];

  return (
    <div>
      <button
        style={{
          width: "44px",
          height: "44px",
          background: "transparent",
          border: "1px #525252 solid",
          borderRadius: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <img src="addSticker.svg" alt="text" />
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <div
            style={{
              width: "390px",
              height: "auto",
              background: "#323232",
              borderRadius: 15,
              overflow: "hidden",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: "20px",
              display: "flex",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "24px",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Inter",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Stickers
              </label>
            </div>

            <div
              className="grid grid-cols-3 gap-8"
              style={{
                maxHeight: "100%",
                overflowY: "auto",
              }}
            >
              {newStickerArray.map((stickerData, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onStickerSelection(newStickerArray[index].stickerURL);
                  }}
                  style={{
                    width: "90px",
                    height: "90px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img src={stickerData.stickerURL} alt="sticker" />

                  {stickerData.verified && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "20px", // Adjust the size of the overlay image as needed
                        height: "20px",
                        background: "url('tick.svg')", // Specify the URL of the overlay image
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StickerModal;
