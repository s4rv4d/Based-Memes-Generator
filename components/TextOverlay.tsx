import React, { useEffect, useState } from "react";
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
    width: "100px",
    height: "100px",
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

  useEffect(() => {
    console.log(`test ${state.width}, ${state.height}`);
  }, []);

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
          width: `${state.width}px`,
          height: `${state.height}px`,
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          console.log(`testing: ${ref.style.width}  ${ref.style.height}`);
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
        <div className="flex flex-col items-center justify-center">
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
                height: `${state.height}`,
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
            (editing ? (
              <textarea
                // type="text"
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
                  width: `${state.width}`,
                  height: `${state.height}`,
                  // overflow: "hidden",
                  cursor: "pointer",
                  // wordWrap: "break-word",
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
