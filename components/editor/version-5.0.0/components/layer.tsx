import React, { useMemo } from "react";
import { Sequence } from "remotion";
import { LayerContent } from "./layer-content";
import { Overlay } from "../types";
import { MAX_ROWS } from "../constants";

export const Layer: React.FC<{
  overlay: Overlay;
  selectedOverlayId: number | null;
}> = ({ overlay, selectedOverlayId }) => {
  const style: React.CSSProperties = useMemo(() => {
    const isSelected = overlay.id === selectedOverlayId;
    const zIndex = (MAX_ROWS - (overlay.row || 0)) * 10;

    return {
      position: "absolute",
      left: overlay.left,
      top: overlay.top,
      width: overlay.width,
      height: overlay.height,
      transform: `rotate(${overlay.rotation || 0}deg)`,
      transformOrigin: "center center",
      maxWidth: "100%",
      maxHeight: "100%",
      zIndex,
      pointerEvents: isSelected ? "all" : "none",
    };
  }, [
    overlay.height,
    overlay.left,
    overlay.top,
    overlay.width,
    overlay.rotation,
    overlay.row,
    overlay.id,
    selectedOverlayId,
  ]);

  if (overlay.type === "sound") {
    return (
      <Sequence
        key={overlay.id}
        from={overlay.from}
        durationInFrames={overlay.durationInFrames}
      >
        <LayerContent overlay={overlay} />
      </Sequence>
    );
  }

  return (
    <Sequence
      key={overlay.id}
      from={overlay.from}
      durationInFrames={overlay.durationInFrames}
      layout="none"
    >
      <div style={style}>
        <LayerContent overlay={overlay} />
      </div>
    </Sequence>
  );
};
