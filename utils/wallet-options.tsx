import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return <WalletOption onClick={() => connect({ connector: injected() })} />;
}

function WalletOption({ onClick }: { onClick: () => void }) {
  return (
    <div
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 12,
        paddingBottom: 12,
        background: "#323232",
        borderRadius: 30,
        overflow: "hidden",
        border: "1px #525252 solid",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <button
        style={{
          textAlign: "center",
          color: "#5A99F2",
          fontSize: 14,
          // fontFamily: "Public Sans",
          fontWeight: "600",
          wordWrap: "break-word",
        }}
        onClick={onClick}
      >
        Connect
      </button>
    </div>
  );
}
