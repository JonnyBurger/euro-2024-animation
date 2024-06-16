import React from "react";
import { AbsoluteFill } from "remotion";

export const Perspective: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        transform: `translateY(-50%)`,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `perspective(700px) rotateX(20deg) scaleX(1.5)`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
