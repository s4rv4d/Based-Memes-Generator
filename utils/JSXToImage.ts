import { ImageResponse } from "@vercel/og";

export function jsxToImageResponse({ jsx }: { jsx: JSX.Element }) {
  const width = 500;
  const height = Math.round(width * 1.91);

  return new ImageResponse(jsx, {
    width,
    height,
  });
}
