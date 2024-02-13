import React from "react";
import { Rnd, DraggableEventHandler, ResizeHandler } from "react-rnd";

// Extending the interface to include style properties
interface TextOverlayProps {
  text: string;
  onDragStop: DraggableEventHandler;
  onResizeStop: ResizeHandler;
  fontName: string;
  fontSize: string;
  color: string;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  onDragStop,
  onResizeStop,
  fontName,
  fontSize,
  color,
}) => {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      <div
        style={{
          fontFamily: fontName,
          fontSize: `${fontSize}px`,
          color: color,
        }}
      >
        {text}
      </div>
    </Rnd>
  );
};

export default TextOverlay;
