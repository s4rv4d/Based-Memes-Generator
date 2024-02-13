import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const projectId = "57e7b95b6fe2e9186cd0caf2eaaa68e9";

if (!projectId) throw new Error("Project ID is not defined");

export const config = createConfig({
  chains: [baseGoerli],
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
    [baseGoerli.id]: http(),
  },
});
