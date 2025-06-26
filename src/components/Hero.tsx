"use client";
import {
  type MotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "@/components/Link";
import ResumeButton from "./ResumeButton";

const container: MotionProps["variants"] = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      ease: "easeInOut",
      delayChildren: 1,
    },
    opacity: 1,
  },
};

const child: MotionProps["variants"] = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
    y: 0,
  },
  hidden: {
    y: 30,
    opacity: 0,
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "400vh center"],
  });
  const parallaxImage = useTransform(scrollYProgress, [0, 1], ["30%", "-220%"]);
  const parallaxText = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 5]);

  const MotionImage = motion.img;

  return (
    <motion.section
      ref={ref}
      style={{
        height: "calc(100vh - 100px)",
      }}
      className="relative"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        style={{
          bottom: "30%",
          transformOrigin: "bottom",
        }}
        className="absolute bottom-0  overflow-hidden h-4/5 w-full -z-10"
      >
        <MotionImage
          src="/images/self.jpg"
          alt="Self Picture"
          style={{
            objectFit: "cover",
            scale: scaleValue as MotionValue<number> & number,
          }}
          transition={{
            ease: "easeInOut",
          }}
          className="-z-10"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-background opacity-20 z-10"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent z-10"></div>
      </motion.div>

      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link
          href="https://vvlvhhmsstntun7o.public.blob.vercel-storage.com/portfolio/Sourav_Rakshit_Resume"
          target="_blank"
          className="h-16 w-16"
        >
          <ResumeButton />
        </Link>
      </motion.div>
      <motion.div
        className="h-full w-full flex flex-col justify-center items-center"
        variants={container}
        animate="visible"
        initial="hidden"
        style={{
          y: parallaxText,
        }}
        exit="hidden"
      >
        <motion.h1
          className={cn(
            "text-[3.5rem] text-nowrap md:text-[6rem] lg:text-[10rem] md:leading-[9rem] font-black text-accent",
            "font-array"
          )}
          variants={child}
        >
          Sourav Rakshit
        </motion.h1>
        <motion.h2
          className={cn(
            "uppercase text-4xl text-nowrap md:text-5xl lg:text-7xl",
            "font-array"
          )}
          variants={child}
        >
          Software Engineer
        </motion.h2>
        <motion.p
          className={cn("lowercase text-xs md:text-md")}
          variants={child}
        >
          by profession
        </motion.p>
        <motion.h2
          className={cn(
            "uppercase text-4xl text-nowrap md:text-5xl lg:text-7xl",
            "font-array"
          )}
          variants={child}
        >
          Photographer
        </motion.h2>
        <motion.p
          variants={child}
          className={cn("lowercase text-xs md:text-md")}
        >
          by hobby
        </motion.p>
        <motion.p
          variants={child}
          className={cn("font-array", "text-xl md:text-2xl")}
        >
          <motion.span className="text-base md:text-xl">Currently </motion.span>
          <Link
            href="https://fabric.inc/"
            target="_blank"
            className={cn("text-accent hover:underline", "font-array")}
            rel="noopener noreferrer"
          >
            @fabric.inc
          </Link>
        </motion.p>
        <motion.div
          variants={child}
          className={cn(
            "font-array",
            "text-xl md:text-2xl flex items-center gap-1"
          )}
        >
          <motion.span className="text-base md:text-xl">Based in</motion.span>
          <Link
            href="https://fabric.inc/"
            rel="noopener noreferrer"
            target="_blank"
            className={cn(
              "text-accent flex items-center hover:underline",
              "font-array"
            )}
          >
            WB, India
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
