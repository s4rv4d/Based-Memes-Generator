export function Scaffold({ children: element }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex", // Use flex layout
        flexDirection: "row", // Align items horizontally
        alignItems: "stretch", // Stretch items to fill the container height
        position: "relative", // Required for absolute positioning of the icon
        width: "100%",
        height: "100vh", // Full viewport height
        backgroundColor: "#0252FF",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1.2,
          fontSize: 36,
          color: "white",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {element}
      </div>
    </div>
  );
}
