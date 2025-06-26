"use client";
import { showcase } from "@/data";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Photography() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["center end", "center center"],
    // smooth: 5,
  });

  const text1 = "Wanna see my visual symphony?";
  const text2 =
    "I post photos and videos on my Instagram, here's a few of them.";

  return (
    <>
      <WriteSection text={text1} />
      <WriteSection className="text-right text-accent" text={text2} />
      <PhotographyContent />
    </>
  );
}

function PhotographyContent() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
    // smooth: 5,
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const hScroll = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const MotionImage = motion.img;
  return (
    <section className="h-[500vh] relative" ref={container}>
      <div className="h-[100svh] sticky top-0 overflow-hidden flex items-center">
        <motion.div
          className="h-full flex gap-8 justify-center w-fit items-center p-12"
          style={{
            x: hScroll,
          }}
        >
          <div className="w-[100vw] h-full"> </div>
          {showcase.map((content, i) => {
            return (
              <div
                key={`${i}-showcase-${content.alt}`}
                className="h-full w-[90vw] max-w-[500px] block relative rounded-3xl overflow-hidden border-2 border-foreground"
              >
                <MotionImage
                  src={content.src}
                  alt={content.alt}
                  style={{
                    objectFit: "cover",
                    scale: 1,
                  }}
                  whileHover={{
                    scale: 1.2,
                  }}
                  className="pointer-events-none"
                />
              </div>
            );
          })}
          <div className="w-[100vh] h-full"> </div>
        </motion.div>
      </div>
    </section>
  );
}

function MotionChar({
  range,
  char,
  progress,
}: {
  range: number[];
  char: string;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, range, ["30%", "0%"]);
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span
      style={{
        opacity,
        y: "30%",
      }}
    >
      {char}
    </motion.span>
  );
}

function WriteSection({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["30vh end", "center center"],
    // smooth: 5,
  });
  return (
    <section className="h-[100vh] relative p-8" ref={container}>
      <div className="bg-background h-full text-background flex flex-col items-center justify-center gap-20 sticky top-0 overflow-hidden">
        <h1
          className={cn(
            "text-foreground text-7xl lg:text-[10rem]",
            "font-array",
            className
          )}
        >
          {text.split("").map((char, i) => {
            const range = [i / text.length, (i + 1) / text.length];
            return (
              <MotionChar
                key={i}
                range={range}
                char={char}
                progress={scrollYProgress}
              />
            );
          })}
        </h1>
      </div>
    </section>
  );
}
