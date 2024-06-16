import { Easing, interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/LeagueGothic";
import {
  loadFont as loadMontserrat,
  fontFamily as montserrat,
} from "@remotion/google-fonts/Montserrat";
import { SwitzerlandLogo } from "./SwitzerlandLogo";

loadFont();
loadMontserrat("normal");

export const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.ease),
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translationY = interpolate(progress, [0, 1], [50, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        transform: `translateZ(-1000px) translateY(${translationY}px)`,
        opacity,
      }}
    >
      <SwitzerlandLogo />
      <div style={{ height: 50 }} />
      <div
        style={{
          fontSize: 180,
          fontFamily,
        }}
      >
        SWITZERLAND
      </div>
      <div style={{ height: 120 }} />
      <div
        style={{
          fontFamily: montserrat,
          color: "#E8C234",
          fontWeight: 600,
          fontSize: 36,
        }}
      >
        HEAD COACH
      </div>
      <div
        style={{
          fontFamily: montserrat,
          color: "#fff",
          fontSize: 36,
        }}
      >
        MURAT <span style={{ fontWeight: "bold" }}>YAKIN</span>
      </div>
    </AbsoluteFill>
  );
};
