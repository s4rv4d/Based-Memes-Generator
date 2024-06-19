/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import { Public_Sans } from "next/font/google";
import { headers } from "next/headers";
import fetchDoc from "@/utils/fetchDoc";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import ContextProvider from "@/context";
import { imageUrl } from "@/utils/render-image";

const inter = Public_Sans({ subsets: ["latin"] });

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

export async function generateMetadata({
  params,
}: {
  params: { params: string };
}): Promise<Metadata> {
  let nftIDOne: string;
  let nftIDTwo: string;
  let nftOne: Nft;
  let nftTwo: Nft;

  [nftIDOne, nftIDTwo] = params.params.split("-");
  nftOne = await fetchDoc(nftIDOne);
  nftTwo = await fetchDoc(nftIDTwo);

  const image = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 12,
          fontWeight: "600",
          wordWrap: "break-word",
        }}
        className={inter.className}
      >
        MEME OFF!
      </span>
      <div tw="flex flex-row justify-between mx-2">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="meme-image"
            src={parseIpfsUrl(nftOne.ipfs).gateway}
            tw="w-[150px]"
          />
          <span
            style={{
              color: "#CDCDD0",
              fontSize: 10,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
            className={inter.className}
          >
            {nftOne.fileName ? nftOne.fileName : "Based Meme"}
          </span>
          <span
            style={{
              color: "#CDCDD0",
              fontSize: 10,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            by{" "}
            {nftOne.creatorAddress.slice(0, 4) +
              "...." +
              nftOne.creatorAddress.slice(-4)}
            {/* {` · ${nft.mints ? nft.mints : 0} mints`} */}
          </span>
        </div>
        <label>vs</label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="meme-image"
            src={parseIpfsUrl(nftTwo.ipfs).gateway}
            tw="w-[150px]"
          />
          <span
            style={{
              color: "#CDCDD0",
              fontSize: 10,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
            className={inter.className}
          >
            {nftTwo.fileName ? nftTwo.fileName : "Based Meme"}
          </span>
          <span
            style={{
              color: "#CDCDD0",
              fontSize: 10,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            by{" "}
            {nftTwo.creatorAddress.slice(0, 4) +
              "...." +
              nftTwo.creatorAddress.slice(-4)}
          </span>
        </div>
      </div>
    </div>
  );

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        action: "tx",
        label: "Mint #1",
        target: `${String(
          process.env.NEXT_PUBLIC_HOST_URL
        )}/api/mint?editionAddress=${nftOne.editionAddress}&id=${nftIDOne}`,
      },
      {
        action: "tx",
        label: "Mint #2",
        target: `${String(
          process.env.NEXT_PUBLIC_HOST_URL
        )}/api/mint?editionAddress=${nftTwo.editionAddress}&id=${nftIDTwo}`,
      },
    ],
    image: {
      src: `${imageUrl(image)}`,
      aspectRatio: "1.91:1",
    },
    postUrl: `${String(
      process.env.NEXT_PUBLIC_HOST_URL
    )}/api/aftertx?id=${nftIDTwo}`,
  });

  return {
    title: "Testing meme off",
    description: `basedMemes.xyz`,
    openGraph: {
      title: "Testing meme off",
      description: `Create with basedMemes.xyz`,
      locale: "en_US",
      type: "website",
    },
    other: {
      ...frameMetadata,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider initialState={initialState}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
