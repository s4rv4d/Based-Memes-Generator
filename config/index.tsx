import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// export const config = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     injected(),
//     walletConnect({
//       projectId: projectId,
//       showQrModal: false,
//     }),
//     coinbaseWallet({
//       appName: "Based Memes",
//       appChainIds: [baseSepolia.id],
//     }),
//   ],
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports: {
//     // [goerli.id]: http(),
//     [baseSepolia.id]: http(),
//   },
// });

const metadata = {
  name: "Based Memes",
  description: "Onchain Meme generator",
  url: "https://www.basedmemes.xyz",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [base, baseSepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// const metadata = {
//   name: "Web3Modal",
//   description: "Web3Modal Example",
//   url: "https://web3modal.com", // origin must match your domain & subdomain
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// export const config = defaultWagmiConfig({
//   chains: [baseSepolia],
//   projectId,
//   metadata,
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   // ...wagmiOptions, // Optional - Override createConfig parameters
// });
