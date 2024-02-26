import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { base, goerli } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const config = createConfig({
  chains: [goerli, base],
  connectors: [
    injected(),
    walletConnect({
      projectId: "57e7b95b6fe2e9186cd0caf2eaaa68e9",
      showQrModal: false,
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [goerli.id]: http(),
    [base.id]: http(),
  },
});
