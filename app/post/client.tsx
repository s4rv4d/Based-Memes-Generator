"use client";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { useEffect } from "react";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ZoraAbi, getContractFromChainId } from "../../abi/zoraEdition";
import Loader from "@/components/loader";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

export const PostInfo = ({ item }: { item: Nft }) => {
  const {
    data: hash,
    isPending,
    writeContract,
    error,
    isError,
  } = useWriteContract();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const { explorer } = getContractFromChainId(5);
  const [dbUpdateDone, setDbUpdateDone] = useState<boolean>(false);
  const [nft, setNft] = useState<Nft>(item);

  const { data: ensName } = useEnsName({ address: nft.creatorAddress });

  const computeEthToSpend = (publicSalePrice: string, numEditions: string) => {
    if (numEditions === "")
      return {
        creatorReward: BigInt(0),
        createReward: BigInt(0),
        mintReferral: BigInt(0),
        zoraFee: BigInt(0),
        firstMinterReward: BigInt(0),
        total: BigInt(0),
      };

    const bigNumEditions = BigInt(numEditions);

    // defaults
    const creatorReward = BigInt("333000000000000") * bigNumEditions;
    const createReward = BigInt("111000000000000") * bigNumEditions;
    const mintReferral = BigInt("111000000000000") * bigNumEditions;
    const zoraFee = BigInt("111000000000000") * bigNumEditions;
    const firstMinterReward = BigInt("111000000000000") * bigNumEditions;

    if (publicSalePrice === "0") {
      // free mint

      return {
        creatorReward,
        createReward,
        mintReferral,
        zoraFee,
        firstMinterReward,
        total:
          creatorReward +
          createReward +
          mintReferral +
          zoraFee +
          firstMinterReward,
      };
    } else {
      // paid mint
      const editionPrice = BigInt(publicSalePrice) * bigNumEditions;
      const p_createReward = createReward * BigInt(2);
      const p_mintReferral = mintReferral * BigInt(2);
      const p_zoraFee = zoraFee * BigInt(2);
      const p_firstMinterReward = firstMinterReward;
      return {
        editionPrice,
        createReward: p_createReward,
        mintReferral: p_mintReferral,
        zoraFee: p_zoraFee,
        firstMinterReward,
        total:
          editionPrice +
          p_createReward +
          p_mintReferral +
          p_zoraFee +
          p_firstMinterReward,
      };
    }
  };

  const mintEditionNFT = async () => {
    setIsLoading(true);
    setLoadingText("Minting...");

    let userAddress = address;

    writeContract({
      address: nft.editionAddress,
      abi: ZoraAbi,
      functionName: "mintWithRewards",
      args: [
        userAddress,
        BigInt(1),
        "Minting a meme onchain, guess im based :)",
        "0x5371d2E73edf765752121426b842063fbd84f713",
      ],
      enabled: true,
      value: computeEthToSpend("0", "1").total.toString(),
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
    error: reciptError,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`localhost:3000/nft/${nft.id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const ShareIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-share"
      onClick={() => copyToClipboard()}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <polyline points="16 6 12 2 8 6"></polyline>
      <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
  );

  const handleOverlayClick = () => {
    if (dbUpdateDone || isReceiptError || isError || isConfirmed) {
      setIsLoading(false);
      setDbUpdateDone(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const post = async () => {
      console.log(data);

      let currentMint = nft.mints;

      const docRef = doc(db, "nfts", nft.id);

      await updateDoc(docRef, { ...nft, mints: currentMint + 1 });

      setNft({ ...nft, mints: currentMint + 1 });

      setDbUpdateDone(true);
    };

    if (isConfirmed) {
      post();
    }

    if (isError) {
      if (
        error?.message &&
        (error.message.includes("insufficient funds") ||
          error.message.includes("exceeds the balance of the account"))
      ) {
        setLoadingText("Insufficient funds");
      } else if (
        error?.message &&
        (error.message.includes("User rejected the request") ||
          error.message.includes("User rejected the request"))
      ) {
        setLoadingText("Request denied :(");
      } else {
        setLoadingText(error?.message);
      }
    }

    if (isReceiptError) {
      if (
        reciptError?.message &&
        (reciptError.message.includes("insufficient funds") ||
          reciptError.message.includes("exceeds the balance of the account"))
      ) {
        setLoadingText("Insufficient funds");
      } else if (
        reciptError?.message &&
        (reciptError.message.includes("User rejected the request") ||
          reciptError.message.includes("User rejected the request"))
      ) {
        setLoadingText("Request denied :(");
      } else {
        setLoadingText(reciptError?.message);
      }
    }
  }, [isConfirmed, isError, isReceiptError]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: 20,
            background: "linear-gradient(108deg, #2E2E2E 0%, #1F1F1F 100%)",
            boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.16)",
            borderRadius: 25,
            overflow: "hidden",
            border: "1px #525252 solid",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
                  fontSize: 20,
                  fontFamily: "Inter",
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
                    fontSize: 14,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  Added by{" "}
                </span>
                <span
                  style={{
                    color: "#A6A6B0",
                    fontSize: 14,
                    fontFamily: "Inter",
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <ShareIcon />
              <div
                style={{
                  paddingLeft: 32,
                  paddingRight: 32,
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
                <button
                  style={{
                    textAlign: "center",
                    color: "#5A99F2",
                    fontSize: 14,
                    fontFamily: "Inter",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                  onClick={() => {
                    mintEditionNFT();
                  }}
                >
                  Mint
                </button>
              </div>
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
              marginTop: 16,
            }}
          >
            <img
              src={parseIpfsUrl(nft.ipfs).gateway}
              style={{
                width: "auto", // Corresponds to `w-auto`, allowing the element's width to adjust based on its content up to its container's width
                maxWidth: "100%", // Corresponds to `max-w-full`, ensuring the element's maximum width does not exceed the width of its container
                height: "30rem", // Corresponds to `h-auto`, allowing the element's height to adjust based on its content up to its container's height
                maxHeight: "80%", // Corresponds to `max-h-full`, ensuring the element's maximum height does not exceed the height of its container
              }}
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div onClick={handleModalClick}>
            <Loader
              loadingText={loadingText}
              isCompleted={dbUpdateDone}
              isError={
                isError ? isError : isReceiptError ? isReceiptError : false
              }
              txnURL={explorer + `/tx/${hash}`}
              dbId={nft.id}
            />
          </div>
        </div>
      )}
    </>
  );
};
