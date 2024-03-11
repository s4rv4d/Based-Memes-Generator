"use client";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  ZoraAbi,
  getContractFromChainId,
  computeEthToSpend,
} from "../../../abi/zoraEdition";
import { Account } from "@/utils/account";
import { WalletOptions } from "@/utils/wallet-options";
import Loader from "@/components/loader";
import { Address } from "viem";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

export const Post = ({ id }: { id: string }) => {
  const [nft, setNft] = useState<Nft>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | undefined>(
    "Loading..."
  );
  const [dbUpdateDone, setDbUpdateDone] = useState<boolean>(false);

  const { isConnected } = useAccount();
  const { data: hash, writeContract, error, isError } = useWriteContract();
  const { address } = useAccount();
  const { explorer } = getContractFromChainId(
    Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  );

  function ConnectWallet() {
    return <WalletOptions />;
  }

  const mintEditionNFT = async () => {
    setIsLoading(true);
    setLoadingText("Minting...");

    let userAddress = address;

    writeContract({
      address: nft?.editionAddress as Address,
      abi: ZoraAbi,
      functionName: "mintWithRewards",
      args: [
        userAddress as Address,
        BigInt(1),
        "Minting a meme onchain, guess im based :)",
        nft?.creatorAddress as Address,
      ],
      // enabled: true,
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

  const handleOverlayClick = () => {
    if (dbUpdateDone || isReceiptError || isError || isConfirmed) {
      setIsLoading(false);
      setDbUpdateDone(false);
    }
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const post = async () => {
      console.log(data);

      let currentMint = nft!.mints;
      const docRef = doc(
        db,
        String(process.env.NEXT_PUBLIC_FIRESTIRE_ENDPOINT),
        nft!.id
      );
      await updateDoc(docRef, { ...nft, mints: currentMint + 1 });
      setDbUpdateDone(true);

      setNft({ ...nft, mints: currentMint + 1 } as Nft);
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

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(
        db,
        String(process.env.NEXT_PUBLIC_FIRESTIRE_ENDPOINT),
        id
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setNft({ ...docSnap.data(), id: docSnap.id } as Nft);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getData();
  }, []);
  return (
    <>
      <div>
        {nft && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
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
                        fontSize: 14,
                        // fontFamily: "Public Sans",
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
                        // fontFamily: "Public Sans",
                        fontWeight: "600",
                        // lineHeight: 18,
                        wordWrap: "break-word",
                      }}
                    >
                      {nft.creatorAddress.slice(0, 4) +
                        "...." +
                        nft.creatorAddress.slice(-4)}
                      {` · ${nft.mints ? nft.mints : 0} mints`}
                    </span>
                  </div>
                </div>

                {isConnected && (
                  <div
                    style={{
                      paddingLeft: 32,
                      paddingRight: 32,
                      paddingTop: 12,
                      paddingBottom: 12,
                      background: "#0252FF",
                      borderRadius: 30,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      display: "inline-flex",
                    }}
                  >
                    <button
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 14,
                        // fontFamily: "Public Sans",
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
                )}

                {!isConnected && <w3m-button />}
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
                  alt="meme-image"
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
        )}
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
              dbId={id}
            />
          </div>
        </div>
      )}
    </>
  );
};
