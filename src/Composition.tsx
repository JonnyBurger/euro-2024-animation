import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { useCurrentFrame } from "remotion";
import { random, spring, useVideoConfig } from "remotion";
import { FINAL_RADIUS, Ray } from "./Ray";
import { Perspective } from "./Perspective";
import { ScaleIn } from "./ScaleIn";
import { Overlay } from "./Overlay";

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

const SEGMENTS = 66;
const singlesegmentLength = 1 / SEGMENTS;

export const MyComposition = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img
          src={staticFile("pitch.png")}
          style={{ objectFit: "cover", transform: `scale(1.05)` }}
        />
      </AbsoluteFill>
      <Perspective>
        <ScaleIn>
          <AbsoluteFill style={{ opacity: 0.9 }}>
            {new Array(SEGMENTS).fill(true).map((_, i) => {
              const prog = spring({
                fps,
                frame,
                config: {
                  damping: 200,
                },
                delay: random(i) * 5,
              });
              const rotation = (i / SEGMENTS) * 2 * Math.PI + (Math.PI / 3) * 2;

              const initialRadius =
                i > SEGMENTS / 3
                  ? FINAL_RADIUS
                  : random(i) * 0.1 * FINAL_RADIUS;
              const radius = interpolate(
                prog,
                [0, 1],
                [initialRadius, FINAL_RADIUS]
              );

              return (
                <Ray
                  radius={radius}
                  strokeWidth={radius}
                  color="#252360"
                  i={i}
                  sliceLength={singlesegmentLength}
                  rotation={rotation}
                />
              );
            })}
          </AbsoluteFill>
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

            const sliceLength =
              i % 2 === 0 ? singlesegmentLength * 2 : singlesegmentLength;
            const initialProgress = random(i) * 0.3;
            const color = colors[i % colors.length];
            const delay = random(i) * 10;
            const prog = progress(delay, initialProgress);
            const rotation = (i / SEGMENTS) * 2 * Math.PI + (Math.PI / 3) * 2;
            const absoluteRadius = random(i) + 0.4 * FINAL_RADIUS;
            const radius = interpolate(
              prog,
              [0, 1],
              [absoluteRadius, FINAL_RADIUS]
            );

            const strokeWidth = interpolate(prog, [0, 1], [absoluteRadius, 12]);

            return (
              <Ray
                strokeWidth={strokeWidth}
                radius={radius}
                color={color}
                i={i}
                sliceLength={sliceLength}
                rotation={rotation}
              />
            );
          })}
        </ScaleIn>
      </Perspective>
      <Overlay />
    </AbsoluteFill>
  );
};
