"use client";;
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export default function WhatIDo() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });
  return (
    <section className="h-[100vh] relative bg-foreground" ref={container}>
      <div className="text-background h-[100vh] flex flex-col items-center justify-center gap-20 sticky top-0 overflow-hidden">
        <h1 className={cn("font-array", "text-7xl text-center px-4")}>
          What I do?
        </h1>
        <div className="flex justify-center items-center">
          <Content scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function Content({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="justify-center flex-col items-center flex uppercase font-bold">
      <Slide
        src={'/images/image1.png'}
        direction={"left"}
        left={"0%"}
        progress={scrollYProgress}
        text="Software Development"
      />

      <Slide
        src={'/images/image2.png'}
        direction={"right"}
        left={"0%"}
        progress={scrollYProgress}
        text="Photography"
      />

      <Slide
        src={'/images/image3.png'}
        direction={"left"}
        left={"0%"}
        progress={scrollYProgress}
        text="Videography"
      />
    </div>
  );
}

const Slide = (props: {
  direction: "left" | "right";
  progress: MotionValue<number>;
  left: string;
  src: string;
  text: string;
}) => {
  const direction = props.direction == "left" ? -1 : 1;

  const translateX = useTransform(
    props.progress,
    [0, 1],
    [300 * direction, -300 * direction]
  );

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} text={props.text} />

      <Phrase src={props.src} text={props.text} />

      <Phrase src={props.src} text={props.text} />
    </motion.div>
  );
};

const Phrase = ({
  src,
  text,
}: {
  src: string | HTMLImageElement["src"];
  text: string;
}) => {
  return (
    <div className={"px-5 flex gap-5 items-center"}>
      <p className="text-[7.5vw] font-bold">{text}</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <motion.img style={{ objectFit: "cover" }} src={src} alt="image" />
      </span>
    </div>
  );
};
