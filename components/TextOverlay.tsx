import React, { useState } from "react";
import { Rnd, DraggableEventHandler, ResizeHandler } from "react-rnd";
import "./styles/textoverlay.css";
// import * as NumericInput from "react-numeric-input";
import NumericInput from "react-numeric-input";
import SketchExample from "./SketchExample";

// Extending the interface to include style properties
interface TextOverlayProps {
  text: string;
  onDragStop: DraggableEventHandler | null;
  onResizeStop: ResizeHandler | null;
  fontName: string;
  fontSize: string;
  color: string;
  isEditable: boolean;
  isResizable: boolean;
  isFinal: boolean;
}

interface StyleType {
  fontName: string;
  fontSize: number;
  color: string;
}

interface SizeState {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

const inputStyle: React.CSSProperties = {
  // paddingLeft: "8px",
  color: "#FFFFFF",
  height: "40px",
  background: "#525252",
  borderRadius: "4px",
};

const editInputStyle: React.CSSProperties = {
  padding: "8px",
  color: "#FFFFFF",
  height: "30px",
  width: "30px",
  background: "transparent",
};

const labelStackStyle: React.CSSProperties = {
  flexDirection: "column",
  background: "transparent",
  display: "flex",
  margin: 0,
  gap: 4,
};

const TextOverlay: React.FC<TextOverlayProps> = ({
  fontName,
  fontSize,
  color,
  isEditable,
  isResizable,
  isFinal,
}) => {
  const [state, setState] = useState<SizeState>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [style, setStyle] = useState<StyleType>({
    fontName: "Impact",
    fontSize: 15,
    color: "#FFFFFF",
  });

  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    console.log("clicked");
    setEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleColorChange = (color: any) => {
    setStyle({
      ...style,
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    });
  };

  return (
    <>
      <Rnd
        // default={{
        //   x: 0,
        //   y: 0,
        //   width: 300,
        //   height: 150,
        // }}
        onClick={handleDoubleClick}
        style={{
          // overflow: "clip",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "auto",
        }}
        size={{
          width: `${state.width}px`,
          height: `${state.height}px`,
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
        <div className="flex flex-col items-center justify-center gap-2">
          {isEditable && !isFinal && (
            <div className="inline-block flex flex-col bg-blue-500 bg-opacity-0">
              <div
                className="flex flex-row gap-2 items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color with transparency
                  // backdropFilter: "blur(5px)", // Apply blur effect
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                <SketchExample onColorChange={handleColorChange} />

                <NumericInput
                  value={style.fontSize}
                  style={{
                    wrap: { background: "transparent", width: "60px" },
                    input: {
                      color: "black",
                      width: "60px",
                      padding: "2px",
                    },
                  }}
                  // style={{
                  //   ...editInputStyle,
                  //   // width: "60px",
                  // }}
                  onChange={(e) => {
                    setStyle({
                      ...style,
                      fontSize: e,
                    }); // Ensure unit is included for fontSize
                  }}
                />
                {/* </div> */}
              </div>
            </div>
          )}

          {isFinal && (
            <span
              style={{
                background: "transparent",
                fontFamily: style.fontName,
                fontSize: `${style.fontSize}px`,
                color: style.color,
                textAlign: "center",
                width: `${state.width}`,
                height: `${state.height}px`,
                // overflow: "hidden",
                wordWrap: "normal",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {value}
            </span>
          )}

          {!isFinal &&
            (isEditable ? (
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                style={{
                  background: "transparent",
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  textAlign: "center",
                  width: "80px",
                  height: "auto",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  wordWrap: "break-word",
                  border: "1px solid white",
                }}
              />
            ) : (
              <button
                // onTouchStart={handleDoubleClick}
                onClick={handleDoubleClick}
                style={{
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  textAlign: "center",
                  width: `${state.width}`,
                  height: `auto`,
                  overflow: "hidden",
                  wordWrap: "normal",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {value.length == 0 ? (
                  <div className="flex flex-row items-center justify-center gap-[4px]">
                    <img
                      src="settings.svg"
                      alt="text"
                      // style={{ height: "38px", width: "38px" }}
                    />
                    {" to edit"}
                  </div>
                ) : (
                  value
                )}
              </button>
            ))}
        </div>
      </Rnd>
    </>
  );
};

export default TextOverlay;
