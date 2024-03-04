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
    width: 200,
    height: 200,
  });

  console.log(src);

  return (
    <>
      {/* {!isFinal && ( */}
      <Rnd
        style={{
          overflow: "clip",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        size={{
          width: `${state.width}px`,
          height: state.height,
        }}
        position={{ x: state.x, y: state.y }}
        onDragStop={(e, d) => {
          setState((prevState) => ({ ...prevState, x: d.x, y: d.y }));
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
        }}
        disableDragging={isEditable}
        enableResizing={!isEditable}
      >
        <img
          src={src}
          alt="imageOverlay"
          draggable="false"
          style={{ width: state.width, height: state.height, cursor: "move" }}
          // style={{ maxWidth: "100%" }}
        />
      </Rnd>
      {/* )} */}
    </>
  );
};

export default ImageOverlay;
