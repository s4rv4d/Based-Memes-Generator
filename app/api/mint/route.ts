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

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const editionAddress = req.nextUrl.searchParams.get(
    "editionAddress"
  ) as string;
  const id = req.nextUrl.searchParams.get("id") as string;

  const nft: Nft = await fetchDoc(id);

  const body: FrameRequest = await req.json();
  console.log(body);
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  // TODO
  const data = encodeFunctionData({
    abi: ZoraAbi,
    functionName: "mintWithRewards",
    args: [
      message.interactor.verified_addresses.eth_addresses[0] as Address,
      BigInt(1),
      "Minting a meme onchain, guess im based :)",
      nft?.creatorAddress as Address,
    ],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: editionAddress as Address,
      value: computeEthToSpend("0", "1").total.toString(), // 0.00001 ETH
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
