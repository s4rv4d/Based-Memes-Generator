"use client";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ZoraAbi, getContractFromChainId } from "../../../abi/zoraEdition";
import { Account } from "@/utils/account";
import { WalletOptions } from "@/utils/wallet-options";
import Loader from "@/components/loader";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  // mints: number;
}

export const Post = ({ id }: { id: string }) => {
  const [nft, setNft] = useState<Nft>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const { isConnected } = useAccount();

  const {
    data: hash,
    isPending,
    writeContract,
    error,
    isError,
  } = useWriteContract();
  const { address } = useAccount();

  function ConnectWallet() {
    return <WalletOptions />;
  }

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
    setIsLoading(true);
    const { creator_contract, explorer } = getContractFromChainId(5);

    console.log(nft.editionAddress);
    console.log(address);

    let userAddress = address;

    writeContract({
      //   chainId: 8453,
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
      console.log(error?.message);

      if (
        error?.message &&
        (error.message.includes("insufficient funds") ||
          error.message.includes("exceeds the balance of the account"))
      ) {
        setLoadingText("Insufficient funds");
      } else {
        setLoadingText(error?.message);
      }
    }
  }, [isConfirmed, isError, error]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "nfts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setNft({ ...docSnap.data(), id: docSnap.id });
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

                {isConnected && (
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
                )}

                {!isConnected && <ConnectWallet />}
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
        )}
      </div>

      {isLoading && <Loader loadingText={loadingText} isCompleted={false} />}
    </>
  );
};
