import React from "react";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { useEnsName } from "wagmi";
import "./styles/gallery.css";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

const NFTPost = ({
  index,
  nft,
  showPostView,
  setPost,
}: {
  index: number;
  nft: Nft;
  showPostView: () => void;
  setPost: (nft: Nft) => void;
}) => {
  const { data: ensName } = useEnsName({ address: nft.creatorAddress });

  return (
    <div
      key={index}
      style={{
        width: "auto",
        maxWidth: "350px",
        height: "auto",
        padding: 20,
        background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
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
        setPost(nft);
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
            // fontFamily: "Public Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          {nft.fileName ? nft.fileName : "Based Meme"}
        </div>
        <div>
          <span
            style={{
              color: "#A6A6B0",
              fontSize: 12,
              // fontFamily: "Public Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Added by{" "}
          </span>
          <span
            style={{
              color: "#A6A6B0",
              fontSize: 12,
              // fontFamily: "Public Sans",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {ensName
              ? ensName
              : nft.creatorAddress.slice(0, 4) +
                "...." +
                nft.creatorAddress.slice(-4)}
            {` · ${nft.mints ? nft.mints : 0} mints`}
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
          alt="meme-image"
        />
      </div>
    </div>
  );
};

export default NFTPost;
