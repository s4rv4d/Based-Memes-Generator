import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import ContextProvider from "@/context";

const inter = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Based Memes",
  description: "Create on-chain memes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider initialState={initialState}>
          {children}
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
