import { useCurrentFrame } from "remotion";
import { AbsoluteFill, random, spring, useVideoConfig } from "remotion";
import { FINAL_RADIUS, Ray } from "./Ray";

const colors = [
  "#24BB5D",
  "#020101",
  "#F2C004",
  "#F00E03",
  "#F2F0EE",
  "#28BA61",
  "#033BE0",
  "#F4F0F3",
];

const SEGMENTS = 48;
const singlesegmentLength = 1 / SEGMENTS;

export const MyComposition = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {new Array(SEGMENTS).fill(true).map((_, i) => {
        const prog = spring({
          fps,
          frame,
          config: {
            damping: 200,
          },
        });
        const rotation = (i / SEGMENTS) * 2 * Math.PI + (Math.PI / 3) * 2;
        const initialRadius = FINAL_RADIUS;

        return (
          <Ray
            initialRadius={initialRadius}
            color="blue"
            i={i}
            sliceLength={singlesegmentLength}
            progress={prog}
            finalStrokeWidth={FINAL_RADIUS}
            rotation={rotation}
          />
        );
      })}
      {new Array(SEGMENTS / 3).fill(true).map((_, i) => {
        const progress = (delay: number, initialProgress: number) =>
          spring({
            fps,
            frame,
            config: {
              damping: 200,
            },
            from: initialProgress,
            to: 1,
            delay,
          });

        const radius = random(i) + 0.4;
        const sliceLength =
          i % 2 === 0 ? singlesegmentLength * 2 : singlesegmentLength;
        const initialProgress = random(i) * 0.6;
        const color = colors[i % colors.length];
        const prog = progress(random(i) * 10, initialProgress);
        const rotation = (i / SEGMENTS) * 2 * Math.PI + (Math.PI / 3) * 2;
        const absoluteRadius = radius * FINAL_RADIUS;

        return (
          <Ray
            initialRadius={absoluteRadius}
            color={color}
            i={i}
            sliceLength={sliceLength}
            progress={prog}
            finalStrokeWidth={20}
            rotation={rotation}
          />
        );
      })}
    </AbsoluteFill>
  );
};
