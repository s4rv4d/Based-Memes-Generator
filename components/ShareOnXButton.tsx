import React from "react";

const ShareButton = ({ message, url }: { message: string; url: string }) => {
  // Encode the message and URL to ensure they are URL-safe
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);

  // Construct the share URL
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;

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
        background: "#5A99F2",
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <button
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "600",
          wordWrap: "break-word",
        }}
        onClick={share}
      >
        Share on X
      </button>
    </div>
  );
};

export default ShareButton;
