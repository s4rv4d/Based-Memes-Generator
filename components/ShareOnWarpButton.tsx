import React from "react";

const ShareWarp = ({ message, url }: { message: string; url: string }) => {
  // Encode the message and URL to ensure they are URL-safe
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);

  // Construct the share URL
  const shareUrl = `https://warpcast.com/~/compose?text=${encodedMessage}&embeds[]=${url}`;

  // Function to open the share URL in a new window
  const share = (e) => {
    e.preventDefault();
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        background: "#4e3695",
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
        cursor: "pointer",
      }}
      onClick={share}
    >
      <label
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "600",
          wordWrap: "break-word",
          cursor: "pointer",
        }}
      >
        Share on Warpcast
      </label>
    </div>
  );
};

export default ShareWarp;
