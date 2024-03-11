import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import { base, goerli } from "viem/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import {
  ZoraAbi,
  getContractFromChainId,
  computeEthToSpend,
} from "@/abi/zoraEdition";
import fetchDoc from "@/utils/fetchDoc";
import { Address } from "viem";
import { parseIpfsUrl } from "@/hooks/useZoraCreateEdition";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const id = req.nextUrl.searchParams.get("id") as string;
  const nft: Nft = await fetchDoc(id);

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      image: {
        src: `${parseIpfsUrl(nft.ipfs).gateway}`,
        aspectRatio: "1:1",
      },
      input: {
        text: "Minted!",
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
