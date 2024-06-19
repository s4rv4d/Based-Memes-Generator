import { Metadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import ContextProvider from "@/context";
import { Public_Sans } from "next/font/google";
import { headers } from "next/headers";
import fetchDoc from "@/utils/fetchDoc";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";
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
  params: { id: string };
}): Promise<Metadata> {
  const nft: Nft = await fetchDoc(params.id);
  const name = nft.fileName;

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
      <div tw="flex flex-row justify-center items-center mx-2">
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
            src={parseIpfsUrl(nft.ipfs).gateway}
            tw="w-[200px]"
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
            {nft.fileName ? nft.fileName : "Based Meme"}
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
            {nft.creatorAddress.slice(0, 4) +
              "...." +
              nft.creatorAddress.slice(-4)}
            {/* {` · ${nft.mints ? nft.mints : 0} mints`} */}
          </span>
        </div>
      </div>
    </div>
  );

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        action: "tx",
        label: "Mint",
        target: `${String(
          process.env.NEXT_PUBLIC_HOST_URL
        )}/api/mint?editionAddress=${nft.editionAddress}&id=${params.id}`,
      },
    ],
    image: {
      src: `${imageUrl(image)}`,
      aspectRatio: "1.91:1",
    },
    postUrl: `${String(process.env.NEXT_PUBLIC_HOST_URL)}/api/aftertx?id=${
      params.id
    }`,
  });

  return {
    title: name,
    description: `${name} on basedMemes.xyz`,
    openGraph: {
      title: name,
      description: `Create with basedMemes.xyz`,
      images: [
        {
          url: `${parseIpfsUrl(nft.ipfs).gateway}`,
          width: 600,
          height: 600,
          alt: "BM",
        },
      ],
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
