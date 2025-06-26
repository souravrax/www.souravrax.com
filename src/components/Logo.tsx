import { cn } from "@/lib/utils";
import { animate, motion, motionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import AnimatedChar from "./AnimatedChar";

export default function Logo() {
  const motionYear = motionValue(0);
  const currentYear = new Date().getFullYear() % 100;
  useEffect(() => {
    animate(motionYear, currentYear, {
      duration: 1,
      delay: 0.8,
      ease: [1, 0.1, 0.9, 1],
    });
  }, [motionYear]);
  const year = useTransform(motionYear, (value) => Math.floor(value));
  return (
    <motion.h1
      className={cn(
        "font-array",
        "relative text-4xl md:text-6xl lg:text-7xl mix-blend-difference uppercase"
      )}
    >
      {"folio".split("").map((char, index) => (
        <AnimatedChar key={index} charCode={char.charCodeAt(0)} />
      ))}
      <span className="text-accent">.</span>
      <motion.span id="folio-year" className="text-accent">
        {year}
      </motion.span>
    </motion.h1>
  );
}
