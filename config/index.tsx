import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { base, goerli } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({
      projectId: projectId,
      showQrModal: false,
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    // [goerli.id]: http(),
    [base.id]: http(),
  },
});
