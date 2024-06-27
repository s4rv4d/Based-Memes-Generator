import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { injected, coinbaseWallet } from "wagmi/connectors";
import { Public_Sans } from "next/font/google";

const inter = Public_Sans({ subsets: ["latin"] });

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <WalletOption onClick={() => connect({ connector: coinbaseWallet() })} />
  );
}

function WalletOption({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={inter.className}
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 12,
        paddingBottom: 12,
        background: "#0252FF",
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "flex",
        flex: "1",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "16px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <label
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "600",
          wordWrap: "break-word",
        }}
        // onClick={onClick}
      >
        Connect
      </label>
    </div>
  );
}
