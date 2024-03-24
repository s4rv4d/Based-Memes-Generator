import React, { useEffect, useState } from "react";
import { Rnd, DraggableEventHandler, ResizeHandler } from "react-rnd";
import "./styles/textoverlay.css";
// import * as NumericInput from "react-numeric-input";
import NumericInput from "react-numeric-input";
import SketchExample from "./SketchExample";

// Extending the interface to include style properties
interface StyleType {
  fontName: string;
  fontSize: number;
  color: string;
  strokeColor: string;
}

interface TextOverlayProps {
  text: string;
  itemKey: number;
  onDragStop: DraggableEventHandler | null;
  onResizeStop: ResizeHandler | null;
  isEditable: boolean;
  isFinal: boolean;
  onEdit: (key: number | undefined) => void;
  style: StyleType;
}

interface SizeState {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  itemKey,
  isEditable,
  isFinal,
  style,
  onEdit,
}) => {
  const [state, setState] = useState<SizeState>({
    x: 0,
    y: 0,
    width: "100px",
    height: "100px",
  });

  const [value, setValue] = useState("");

  const handleDoubleClick = () => {
    onEdit(itemKey);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onEdit(undefined);
  };

  return (
    <>
      <Rnd
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
          cursor: "pointer",
          userSelect: "auto",
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
        }}
        disableDragging={isEditable}
        enableResizing={!isFinal}
      >
        <div>
          {isFinal && (
            <span
              style={{
                background: "transparent",
                fontFamily: style.fontName,
                fontSize: `${style.fontSize}px`,
                color: style.color,
                textAlign: "center",
                width: `${state.width}`,
                height: `${state.height}`,
                wordWrap: "normal",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                WebkitTextStroke: `1px ${style.strokeColor}`,
              }}
            >
              {value}
            </span>
          )}

          {!isFinal &&
            (isEditable ? (
              <textarea
                // type="text"
                value={value}
                onChange={handleChange}
                autoFocus
                style={{
                  background: "transparent",
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  WebkitTextStroke: `1px ${style.strokeColor}`,
                  textAlign: "center",
                  width: `${state.width}`,
                  height: `${state.height}`,
                  cursor: "pointer",
                  resize: "none",
                }}
              />
            ) : (
              <label
                onDoubleClick={handleDoubleClick}
                style={{
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  WebkitTextStroke: `${value.length == 0 ? "0px" : "1px"} ${
                    style.strokeColor
                  }`,
                  textAlign: "center",
                  width: `${state.width}`,
                  height: `${state.height}`,
                  overflow: "hidden",
                  wordWrap: "normal",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {value.length == 0 ? "Double tap to edit" : value}
              </label>
            ))}
        </div>
      </Rnd>
    </>
  );
};

export default TextOverlay;
