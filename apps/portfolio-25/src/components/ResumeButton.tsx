"use client";
import {
  animate,
  type AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ResumeButton() {
  const offset = useMotionValue(0);
  const firstOffset = useTransform(offset, (val) => `${val}%`);
  const secondOffset = useTransform(offset, (val) => `${val - 100}%`);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const rotateStart = () => {
    animationRef.current = animate(offset, 100, {
      repeat: Infinity,
      duration: 10,
      ease: "linear",
    });
  };

  const rotateEnd = () => {
    animationRef.current?.pause();
  };

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [offset]);

  return (
    <motion.svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      onHoverStart={rotateStart}
      onHoverEnd={rotateEnd}
    >
      <path
        id="resume-circle"
        d="M50 20 A1 1,0,0,1,50 80 A1 1,0,0,1,50 20Z"
        ref={pathRef}
        strokeWidth={2}
      />
      <motion.text>
        <motion.textPath
          href="#resume-circle"
          className="fill-foreground uppercase"
          spacing="auto"
          textLength={pathLength}
          startOffset={firstOffset}
        >
          <tspan>Resume</tspan>
          <tspan>.</tspan>
          <tspan>Resume</tspan>
          <tspan>.</tspan>
          <tspan>Resume</tspan>
          <tspan>.</tspan>
        </motion.textPath>
        <motion.textPath
          href="#resume-circle"
          className="fill-foreground uppercase"
          spacing="auto"
          textLength={pathLength}
          startOffset={secondOffset}
        >
          <tspan>Resume</tspan>
          <tspan>.</tspan>
          <tspan>Resume</tspan>
          <tspan>.</tspan>
          <tspan>Resume</tspan>
          <tspan>.</tspan>
        </motion.textPath>
      </motion.text>
      <circle cx={50} cy={50} r={25} fill="none" stroke="white" />
      <line
        x1="50"
        x2="50"
        y1="35"
        y2="60"
        stroke="white"
        strokeLinecap="round"
        strokeWidth={4}
      />
      <polyline
        points="40 50 50 60 60 50"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeWidth={4}
      />
    </motion.svg>
  );
}

export function ResumeButton2() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
    </svg>
  );
}
