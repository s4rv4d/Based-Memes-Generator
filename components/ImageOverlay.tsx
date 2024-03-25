import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

interface ImageOverlayProps {
  src: string;
  isEditable: boolean;
  isResizable: boolean;
  isFinal: boolean;
}

interface SizeState {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  src,
  isEditable,
  isResizable,
  isFinal,
}) => {
  const [state, setState] = useState<SizeState>({
    x: 0,
    y: 0,
    width: "100px",
    height: "100px",
  });

  return (
    <>
      {/* {!isFinal && ( */}
      <Rnd
        bounds="parent"
        default={{
          x: 0,
          y: 0,
          width: "100px",
          height: "100px",
        }}
        style={{
          // overflow: "clip",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        size={{
          width: `${state.width}`,
          height: `${state.height}`,
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
        resizeHandleClasses={{
          bottomRight: "resize-handle-bottom-right",
          bottomLeft: "resize-handle-bottom-left",
          topLeft: "resize-handle-top-left",
          topRight: "resize-handle-top-right",
          bottom: "resize-handle-bottom",
          top: "resize-handle-top",
          left: "resize-handle-left",
          right: "resize-handle-right",
        }}
        resizeHandleStyles={{
          topRight: {
            width: "15px", // Custom width for the topRight handle
            height: "15px", // Custom height for the topRight handle
            borderRadius: "20%",
          },
          bottomLeft: {
            width: "15px", // Custom width for the topRight handle
            height: "15px", // Custom height for the topRight handle
            borderRadius: "20%",
          },
          bottomRight: {
            width: "15px", // Custom width for the topRight handle
            height: "15px", // Custom height for the topRight handle
            borderRadius: "20%",
          },
          topLeft: {
            width: "15px", // Custom width for the topRight handle
            height: "15px", // Custom height for the topRight handle
            borderRadius: "20%",
          },
        }}
        disableDragging={isEditable}
        enableResizing={!isEditable}
      >
        <img
          src={src}
          alt="imageOverlay"
          draggable="false"
          style={{
            width: `${state.width}`,
            height: `auto`,
            cursor: "move",
            overflow: "hidden",
          }}
          // style={{ maxWidth: "100%" }}
        />
      </Rnd>
      {/* )} */}
    </>
  );
};

export default ImageOverlay;
