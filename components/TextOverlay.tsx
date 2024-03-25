import React, { useEffect, useState } from "react";
import { Rnd, DraggableEventHandler, ResizeHandler } from "react-rnd";
import "./styles/textoverlay.css";

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

  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    console.log("tapped");
    event.stopPropagation();
    event.preventDefault();
    if ("touches" in event) {
      // Touch event
      if (event.touches.length === 1) {
        // Single touch
        const touch = event.touches[0];
        if (touch.tapCount === 2) {
          onEdit(itemKey);
        }
      }
    } else {
      // Mouse event
      const mouseEvent = event as MouseEvent;
      if (mouseEvent.detail === 2) {
        onEdit(itemKey);
      }
    }
  };

  const handleDoubleClick = () => {
    onEdit(itemKey);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onEdit(undefined);
  };

  const [isTouchMove, setIsTouchMove] = useState(false);

  const handleTouchStart = () => {
    setIsTouchMove(false); // Reset the touch move state on touch start
  };

  const handleTouchMove = () => {
    setIsTouchMove(true); // Set touch move state to true on touch move
  };

  const handleTouchEnd = () => {
    if (!isTouchMove) {
      // Perform your action for a simple touch (tap)
      console.log("Simple touch (tap)");
      handleDoubleClick();
    }
    // Reset the touch move state
    setIsTouchMove(false);
  };

  return (
    <>
      <Rnd
        bounds="parent"
        default={{
          x: 0,
          y: 0,
          width: "100px",
          height: "100px",
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
        style={{
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
        disableDragging={isEditable}
        enableResizing={!isFinal}
      >
        <div
        // onClick={handleInteraction}
        // onTouchStart={handleInteraction}
        // onTouchEnd={handleInteraction}
        // onTouchMove={handleInteraction}
        >
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseMove={handleTouchMove}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                // onDoubleClick={handleDoubleClick}
                style={{
                  fontFamily: style.fontName,
                  fontSize: `${
                    value.length == 0 ? "15px" : `${style.fontSize}px`
                  }`,
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
                {value.length == 0 ? "Tap to edit" : value}
              </label>
            ))}
        </div>
      </Rnd>
    </>
  );
};

export default TextOverlay;
