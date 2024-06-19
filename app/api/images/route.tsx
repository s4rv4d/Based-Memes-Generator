import { NextRequest } from "next/server";
import { jsxToImageResponse } from "@/utils/JSXToImage";
import { deserializeJsx } from "@/utils/render-image";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const serialized = req.nextUrl.searchParams.get("jsx");

  if (!serialized) {
    throw new Error("No jsx");
  }

  const jsx = deserializeJsx(JSON.parse(serialized!));

  const response = jsxToImageResponse({ jsx });

  const imageData = await response.arrayBuffer();

  return new Response(imageData, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": `public, max-age=${3600}`,
    },
  });
}
