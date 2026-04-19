"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export default function MouseBall() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(0, { stiffness: 50, mass: 0.1 });
  const y = useSpring(0, { stiffness: 50, mass: 0.1 });
  const [mounted, setMounted] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!mounted) setMounted(true);
    },
    [mounted, mx, my, x, y],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a[href]")) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [onMouseMove]);

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        visibility: mounted ? "visible" : "hidden",
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        rotate: 360,
        scale: isHoveringLink ? 2.5 : 1,
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        },
        scale: {
          type: "spring",
          stiffness: 150,
          damping: 15,
        },
      }}
      className="fixed h-8 w-8 rounded-full border-2 border-dashed border-accent-foreground bg-transparent z-[999] pointer-events-none"
    />
  );
}
