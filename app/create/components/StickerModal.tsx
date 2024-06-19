"use client";
import React, { useState, useEffect, use } from "react";
import Modal from "@mui/material/Modal";
import AddStickerModal from "./AddStickerModal";
import { db } from "@/app/firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

interface StickerModalType {
  onStickerSelection: (sticker: string, creator: string) => void;
}

interface StickerDataType {
  community: string;
  stickerURL: string;
  verified: boolean;
  creator: string;
}

const StickerModal: React.FC<StickerModalType> = ({ onStickerSelection }) => {
  const [open, setOpen] = useState<boolean>(false);
  const filterIcons: string[] = [
    "",
    "https://dd.dexscreener.com/ds-data/tokens/base/0x0578d8a44db98b23bf096a382e016e29a5ce0ffe.png?size=lg&key=53aa1f",
    "https://dd.dexscreener.com/ds-data/tokens/base/0x6921b130d297cc43754afba22e5eac0fbf8db75b.png?size=lg&key=c01844",
    "https://dd.dexscreener.com/ds-data/tokens/base/0x0d97f261b1e88845184f678e2d1e7a98d9fd38de.png?size=lg&key=198b8a",
    "https://dd.dexscreener.com/ds-data/tokens/base/0xe3086852a4b125803c815a158249ae468a3254ca.png?size=lg&key=df6600",
    "https://dd.dexscreener.com/ds-data/tokens/base/0x7f12d13b34f5f4f0a9449c16bcd42f0da47af200.png?key=025c35",
    "https://dd.dexscreener.com/ds-data/tokens/base/0xf6e932ca12afa26665dc4dde7e27be02a7c02e50.png?size=lg&key=d70034",
    "https://dd.dexscreener.com/ds-data/tokens/base/0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4.png?size=lg&key=f6836d",
  ];
  const [filters, setFilters] = useState<string[]>([
    "General",
    "Higher",
    "Doginme",
    "TYBG",
    "MFER",
    "Normie",
    "Mochi",
    "Toshi",
  ]);
  const [selectedFilter, setSelectedFilter] = useState<string>("General");
  const [stickerArray, setStickerArray] = useState<StickerDataType[]>([]);
  const [updateViewFlag, setUpdateViewFlag] = useState<boolean>(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter((prev) => newFilter);
  };

  const fetchDocs = async () => {
    const doc_refs = await getDocs(
      collection(db, `stickers/community/${selectedFilter}`)
    );

    let itemsArray: StickerDataType[] = [];

    doc_refs.forEach((doc) => {
      itemsArray.push(doc.data() as StickerDataType);
    });

    setStickerArray((prev) => itemsArray);
  };

  useEffect(() => {
    fetchDocs();
  }, [selectedFilter]);

  useEffect(() => {
    console.log("updating");

    const q = query(collection(db, `stickers/community/${selectedFilter}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArray: StickerDataType[] = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...(doc.data() as StickerDataType) });
      });

      setStickerArray((prev) => itemsArray);
    });

    return () => unsubscribe();
  }, [updateViewFlag]);

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
        onClick={handleOpen}
      >
        <img src="addSticker.svg" alt="text" />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              minWidth: "310px",
              width: "80%",
              maxWidth: "400px",
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
              maxHeight: "80%",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                // minWidth: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddStickerModal updateFlag={setUpdateViewFlag} />
                <button onClick={handleClose}>
                  <img src="crossIcon.svg" />
                </button>
              </div>
            </div>

            {/* filters row */}
            <div
              style={{
                display: "flex",
                maxWidth: "100%",
                minWidth: "50%",
                width: "auto",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
                overflowX: "auto",
                height: "30%",
                objectFit: "fill",
              }}
            >
              {filters.map((filter, index) => (
                <div
                  key={index}
                  style={{
                    height: "44px",
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 6,
                    paddingBottom: 6,
                    background: "rgba(50, 50, 50, 0)",
                    borderRadius: 40,
                    overflow: "hidden",
                    border: "1px rgba(81.60, 81.60, 81.60, 0.50) solid",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 6,
                    display: "flex",
                    flexDirection: "row",
                    color: "#CDCDD0",
                    fontSize: 14,
                    fontFamily: "Inter",
                    fontWeight: "600",
                    cursor: "pointer",
                    objectFit: "fill",
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    handleFilterChange(filter);
                  }}
                >
                  {filterIcons[index] !== "" && (
                    <img
                      src={filterIcons[index]}
                      alt="community icon"
                      style={{ width: "16px", height: "16px" }}
                    />
                  )}
                  {filter}
                </div>
              ))}
            </div>

            <div
              className="grid grid-cols-4 gap-8"
              style={{
                maxHeight: "100%",
                overflowY: "auto",
              }}
            >
              {stickerArray.map((stickerData, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onStickerSelection(
                      stickerData.stickerURL,
                      stickerData.creator
                    );
                    setOpen(false);
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <img src={stickerData.stickerURL} alt="sticker" />

                  {stickerData.verified && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "10px", // Adjust the size of the overlay image as needed
                        height: "10px",
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
