import { interpolate } from "remotion";
import { AbsoluteFill } from "remotion";
import React from "react";
import { PathInternals, getLength } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";

export const FINAL_RADIUS = 400;

export const Ray: React.FC<{
  i: number;
  color: string;
  sliceLength: number;
  progress: number;
  finalStrokeWidth: number;
  rotation: number;
  initialRadius: number;
}> = ({
  color,
  i,
  sliceLength,
  progress,
  finalStrokeWidth,
  rotation,
  initialRadius,
}) => {
  const strokeWidth = interpolate(
    progress,
    [0, 1],
    [initialRadius, finalStrokeWidth]
  );

  console.log(FINAL_RADIUS, strokeWidth);
  const circle = makeCircle({
    radius: FINAL_RADIUS - strokeWidth / 2,
  });

  const { path } = circle;

  const length = getLength(path);

  const pathLength = length * sliceLength;
  const cutPath = PathInternals.cutPath(path, pathLength);

  const scale = interpolate(progress, [0, 1], [0.2, 1]);
  const opacity = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale}) rotate(${rotation}rad)`,
      }}
    >
      <svg
        key={i}
        viewBox={`0 0 ${circle.width} ${circle.height}`}
        style={{
          overflow: "visible",
          transformOrigin: "center center",
          opacity,
          width: circle.width,
          height: circle.height,
        }}
      >
        <path
          d={cutPath}
          stroke={color}
          fill="none"
          strokeWidth={strokeWidth}
        />
      </svg>
    </AbsoluteFill>
  );
};
