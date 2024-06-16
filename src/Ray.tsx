import { AbsoluteFill } from "remotion";
import React, { useMemo } from "react";
import { PathInternals, getLength } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";

export const FINAL_RADIUS = 720;

export const Ray: React.FC<{
  i: number;
  color: string;
  sliceLength: number;
  rotation: number;
  radius: number;
  strokeWidth: number;
}> = ({ color, i, sliceLength, rotation, radius, strokeWidth }) => {
  const circle = useMemo(() => {
    return makeCircle({
      radius: radius - strokeWidth / 2,
    });
  }, [radius, strokeWidth]);

  const { path } = circle;

  const length = getLength(path);

  const pathLength = length * sliceLength;

  const cutPath = useMemo(() => {
    return PathInternals.cutPath(path, pathLength);
  }, [path, pathLength]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `rotate(${rotation}rad)`,
      }}
    >
      <svg
        key={i}
        viewBox={`0 0 ${circle.width} ${circle.height}`}
        style={{
          overflow: "visible",
          transformOrigin: "center center",
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
