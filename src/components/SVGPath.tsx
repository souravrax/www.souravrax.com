"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React from "react";
import { useRef } from "react";

export default function SVGPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const shift = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  return (
    <div
      className="flex py-8 items-center flex-col justify-center gap-16 bg-foreground"
      ref={ref}
    >
      <h1
        className={cn(
          "text-center text-background text-2xl md:text-4xl lg:text-7xl",
          "font-array"
        )}
      >
        What I do?
      </h1>
      <svg
        width={"100%"}
        viewBox={`0 0 100 ${65}`}
        fill="none"
        className="overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          id="MyPath"
          fill="none"
          d="M 0,1 h 88 a 1 1,0,0,1,0 20 h-75 a 1 1,0,0,0,0,20 h 75 a 1 1,0,0,1,0 20 h-100"
        />

        <text
          x="14"
          y="15"
          className={cn(
            "fill-accent stroke-background text-md stroke-[0.1px]",
            "font-array"
          )}
        >
          Engineering
        </text>
        <text
          x="13"
          y="35"
          className={cn(
            "stroke-background fill-accent text-sm stroke-[0.1px]",
            "font-array"
          )}
        >
          Photography
        </text>
        <text
          x="8"
          y="55"
          className={cn(
            "fill-accent stroke-background text-md stroke-[0.1px]",
            "font-array"
          )}
        >
          Videography
        </text>

        <motion.text className={cn("fill-background text-[1.5px] select-none")}>
          <motion.textPath href={"#MyPath"} startOffset={shift}>
            {Array.from({ length: 100 }).map((_, i) => (
              <React.Fragment key={`${i}-what-i-do-t-span`}>
                <tspan
                  className={cn(
                    i & 1
                      ? "fill-accent-foreground stroke-[0.1px]"
                      : "fill-background"
                  )}
                >
                  What I do?
                </tspan>
              </React.Fragment>
            ))}
          </motion.textPath>
        </motion.text>
      </svg>
    </div>
  );
}
