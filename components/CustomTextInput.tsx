import { color } from "html2canvas/dist/types/css/types/color";
import React from "react";

interface CustomTextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onStyleChange: (style: {
    fontName: string;
    fontSize: string;
    color: string;
  }) => void;
  style: { fontName: string; fontSize: string; color: string };
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  text,
  onTextChange,
  onStyleChange,
  style,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "5px",
    borderRadius: "8px",
    border: "2px solid #525252",
    marginBottom: "20px",
    background: "#424242",
  };

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
    background: "#424242",
    display: "flex",
    // paddingRight: "8px",
    margin: 0,
    gap: 4,
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {/* Text Input Label and Input */}
        <div style={labelStackStyle}>
          <label
            style={{
              color: "white",
              // marginBlockStart: "2px",
              fontSize: "10px",
            }}
          >
            Text
          </label>
          <input
            type="text"
            value={text}
            style={{ ...inputStyle, width: "100%" }}
            onChange={(e) => onTextChange(e.target.value)}
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
            Color
          </label>
          <input
            type="color"
            value={style.color}
            style={{
              ...editInputStyle,
            }}
            onChange={(e) => onStyleChange({ ...style, color: e.target.value })}
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
            Font Size
          </label>
          <input
            type="number"
            value={parseInt(style.fontSize, 10)}
            style={{
              ...editInputStyle,
            }}
            onChange={
              (e) =>
                onStyleChange({ ...style, fontSize: `${e.target.value}px` }) // Ensure unit is included for fontSize
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTextInput;

/* <div>
        <label style={labelStyle}>Font: </label>
        <input
          type="text"
          style={editInputStyle}
          value={style.fontName}
          onChange={(e) =>
            onStyleChange({ ...style, fontName: e.target.value })
          }
        />
      </div> */
