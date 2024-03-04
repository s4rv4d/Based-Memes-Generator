import React, { useState, useRef, useEffect } from "react";
import { Rnd, DraggableEventHandler, ResizeHandler } from "react-rnd";
import "./styles/textoverlay.css";

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
  height: "40px",
  width: "40px",
  background: "#525252",
  borderRadius: "4px",
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
    width: 300,
    height: 150,
  });

  const [style, setStyle] = useState<StyleType>({
    fontName: "Impact",
    fontSize: 30,
    color: "#FFFFFF",
  });

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("Enter text here");
  const [editing, setEditing] = useState(false);

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    } else {
      textAreaRef.current.style.height = "auto"; // will not work without this!
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      setState((prevState) => ({
        ...prevState,
        height: textAreaRef.current.scrollHeight,
      }));
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  const editableView = () => {};
  const resizableView = () => {};

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <>
      {!isFinal && (
        <Rnd
          style={{
            overflow: "clip",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{
            width: `${state.width}px`,
            height: isEditable ? Number(state.height) + 40 : state.height,
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

            if (textAreaRef.current) {
              textAreaRef.current.style.width = "auto";
              textAreaRef.current.style.width = `${ref.style.width}px`;
              textAreaRef.current.style.height = "auto"; // will not work without this!
              textAreaRef.current.style.height = `${ref.style.height}px`;
            }
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
          <div className="flex flex-col">
            {isEditable && (
              <div className="inline-block flex flex-col bg-blue-500 bg-opacity-0">
                <div className="flex flex-row gap-2">
                  <div style={labelStackStyle}>
                    <label
                      style={{
                        color: "white",
                        marginBlockStart: "2px",
                        fontSize: "10px",
                        textAlign: "center",
                        width: "40px",
                      }}
                    >
                      Color
                    </label>
                    <input
                      type="color"
                      value={style.color}
                      style={{
                        ...editInputStyle,
                      }}
                      onChange={(e) =>
                        setStyle({ ...style, color: e.target.value })
                      }
                    />
                  </div>
                  <div style={labelStackStyle}>
                    <label
                      style={{
                        color: "white",
                        marginBlockStart: "2px",
                        fontSize: "10px",
                      }}
                    >
                      Size
                    </label>
                    <input
                      type="number"
                      value={style.fontSize}
                      style={{
                        ...editInputStyle,
                        width: "60px",
                      }}
                      onChange={
                        (e) =>
                          setStyle({
                            ...style,
                            fontSize: Number(e.target.value),
                          }) // Ensure unit is included for fontSize
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {editing ? (
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                style={{
                  background:
                    "transparent" /* Make input background transparent */,
                  border: "none" /* Remove border */,
                  outline: "none" /* Remove outline */,
                  margin: "2px",
                  backgroundColor: "transparent",
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  textAlign: "center",
                  width: "auto",
                  height: "auto",
                }}
              />
            ) : (
              <span
                onDoubleClick={handleDoubleClick}
                style={{
                  fontFamily: style.fontName,
                  fontSize: `${style.fontSize}px`,
                  color: style.color,
                  maxWidth: "100%",
                  wordWrap: "break-word",
                }}
              >
                {value}
              </span>
            )}
          </div>
        </Rnd>
      )}
    </>
  );
};

export default TextOverlay;
