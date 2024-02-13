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
    padding: "8px",
    color: "#FFFFFF",
    height: "64px",
    background: "#424242",
  };

  const editInputStyle: React.CSSProperties = {
    padding: "8px",
    color: "#FFFFFF",
    height: "64px",
    width: "100px",
    background: "#424242",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="text"
          value={text}
          style={{ ...inputStyle, width: "100%" }}
          onChange={(e) => onTextChange(e.target.value)}
        />
        <input
          type="color"
          value={style.color}
          style={{
            ...editInputStyle,
          }}
          onChange={(e) => onStyleChange({ ...style, color: e.target.value })}
        />
        <input
          type="number"
          value={parseInt(style.fontSize, 10)}
          style={{
            ...editInputStyle,
          }}
          onChange={(e) =>
            onStyleChange({ ...style, fontSize: `${e.target.value}` })
          }
        />
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
