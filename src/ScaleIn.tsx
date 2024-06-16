import { useCurrentFrame } from "remotion";
import React from "react";
import { AbsoluteFill, spring, useVideoConfig } from "remotion";

export const ScaleIn: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};
