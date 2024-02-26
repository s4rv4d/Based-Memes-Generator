import { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import ContextProvider from "@/context";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import fetchDoc from "@/utils/fetchDoc";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";

const inter = Inter({ subsets: ["latin"] });

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
