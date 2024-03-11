import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img
        style={{
          width: "300px",
          height: "auto",
        }}
        src="errrrr404.png"
        alt="404"
      />
    </div>
  );
}
