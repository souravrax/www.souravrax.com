"use client";
import { motion, useScroll, useTransform } from "motion/react";
import React from "react";

export default function TopScroll() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 flex justify-center">
      <motion.div
        style={{ width }}
        className="h-full bg-accent opacity-80 backdrop-blur-lg rounded-full"
      ></motion.div>
    </div>
  );
}
