import React, { useEffect, useState } from "react";
import SketchExample from "@/components/SketchExample";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

interface StyleType {
  fontName: string;
  fontSize: number;
  color: string;
  strokeColor: string;
}

interface TextEditorProps {
  style: StyleType;
  handleColorChange: (color: string) => void;
  handleStrokeChange: (stroke: string) => void;
  handleFontSizeChange: (fontSize: number) => void;
}

const TextLabel = ({
  text,
  fontSize,
  lineHeight,
}: {
  text: string;
  fontSize: number;
  lineHeight: string;
}) => {
  return (
    <div
      style={{
        color: "#A6A6B0",
        fontSize: fontSize,
        fontFamily: "Inter",
        fontWeight: "600",
        lineHeight: lineHeight,
        wordWrap: "break-word",
      }}
    >
      {text}
    </div>
  );
};

const TextEditor: React.FC<TextEditorProps> = ({
  style,
  handleColorChange,
  handleStrokeChange,
  handleFontSizeChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(20);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // setSliderValue(newValue as number);
    handleFontSizeChange(newValue as number);
  };

  const handleTextColorChange = (color: any) => {
    // pass it upwards
    handleColorChange(color);
  };

  const handleTextStrokeChange = (color: any) => {
    // pass it upwards
    handleStrokeChange(color);
  };

  return (
    <div
      style={{
        color: "white",
        background: "#424242",
        borderRadius: 15,
        border: "1px #525252 solid",
      }}
    >
      {/* color switchers */}
      <div
        style={{
          marginTop: "8px",
          marginBottom: "8px",
          marginLeft: "12px",
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <SketchExample
            onColorChange={handleTextColorChange}
            color={style.color}
          />
          <TextLabel text="Text" fontSize={12} lineHeight="12px" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <SketchExample
            onColorChange={handleTextStrokeChange}
            color={style.strokeColor}
          />
          <TextLabel text="Stroke" fontSize={12} lineHeight="12px" />
        </div>

        <div
          style={{
            width: "1px",
            height: "32px",
            background: "green",
            borderRadius: 15,
            border: "1px #525252 solid",
          }}
        ></div>

        {/* slider */}
        <Stack
          width="100%"
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginLeft: "12px",
            marginRight: "12px",
          }}
        >
          <TextLabel text="A" fontSize={12} lineHeight="12px" />
          <Slider
            min={10}
            max={100}
            defaultValue={20}
            value={style.fontSize}
            aria-label="Default"
            valueLabelDisplay="off"
            onChange={handleSliderChange}
            sx={{
              color: "#5E5E63",
              "& .MuiSlider-thumb": {
                color: "#FFFFFF",
                "&:hover, &.Mui-focusVisible": {
                  color: "#FFFFFF",
                  boxShadow: `0px 0px 0px 0px #FFFFFF`,
                },
                "&.Mui-active": {
                  color: "#FFFFFF",
                  boxShadow: `0px 0px 0px 0px #FFFFFF`,
                },
              },
            }}
          />
          <TextLabel text="A" fontSize={20} lineHeight="12px" />
        </Stack>
      </div>
    </div>
  );
};

export default TextEditor;
