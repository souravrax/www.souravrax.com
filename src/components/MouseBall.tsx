"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export default function MouseBall() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(0, { stiffness: 50, mass: 0.1 });
  const y = useSpring(0, { stiffness: 50, mass: 0.1 });
  const [mounted, setMounted] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!mounted) setMounted(true);
    },
    [mounted, mx, my, x, y]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);
  return (
    <motion.div
      style={{
        left: x,
        top: y,
        visibility: mounted ? "visible" : "hidden",
        transformOrigin: "center",
        transform: "translateX(-50%) translateY(-50%)",
      }}
      whileHover={{
        transform: "translateX(-50%) translateY(-50%) scale(1.2)",
      }}
      className="fixed h-8 w-8 rounded-full border-2 border-accent-foreground bg-transparent z-[999] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    />
  );
}
