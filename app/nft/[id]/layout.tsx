import { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import ContextProvider from "@/context";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

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
