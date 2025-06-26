import { motionValue, animate, useTransform, motion } from "motion/react";
import { useEffect } from "react";

export default function AnimatedChar({ charCode }: { charCode: number }) {
  const motionChar = motionValue("a".charCodeAt(0));
  useEffect(() => {
    animate(motionChar, charCode, {
      duration: 1,
      delay: 0.8,
      ease: [1, 0.1, 0.9, 1],
    });
  }, [motionChar, charCode]);
  const char = useTransform(motionChar, (value) => String.fromCharCode(value));
  return <motion.span>{char}</motion.span>;
}
