"use client";
import { useState, useRef } from "react";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ZoraAbi, getContractFromChainId } from "../../abi/zoraEdition";
import { write } from "fs";
import Loader from "@/components/loader";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  // mints: number;
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
  const { creator_contract, explorer } = getContractFromChainId(5);

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
    console.log("entered minting function");

    console.log(item.editionAddress);
    console.log(address);
    setIsLoading(true);

    let userAddress = address;

    writeContract({
      //   chainId: 8453,
      address: item.editionAddress,
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

  useEffect(() => {
    const post = async () => {
      console.log(data);
    };

    if (isConfirmed) {
      post();
    }

    if (isError) {
      // alert(error);
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
      // alert(reciptError);
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

      alert(error);
      alert(reciptError);
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
                Drake Hotline Bling
              </div>
              <div>
                <span
                  style={{
                    color: "#A6A6B0",
                    fontSize: 14,
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
                    fontSize: 14,
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
              src={parseIpfsUrl(item.ipfs).gateway}
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
        <Loader
          loadingText={loadingText}
          isCompleted={isConfirmed}
          isError={isError ? isError : isReceiptError ? isReceiptError : false}
          txnURL={explorer + `/tx/${hash}`}
        />
      )}
    </>
  );
};
