"use client";
import { motion, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import AnimatedLink from "./AnimatedLink";
import Logo from "./Logo";

const container: MotionProps["variants"] = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      ease: "easeInOut",
      delayChildren: 0.5,
    },
  },
};

const child: MotionProps["variants"] = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const headerChild: MotionProps["variants"] = {
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.35,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export default function Header() {
  return (
    <motion.div
      variants={container}
      animate="visible"
      initial="hidden"
      exit="hidden"
      className="flex w-full text-sm justify-between items-start p-5 top-0 z-50"
    >
      <motion.div className="flex flex-col items-start" variants={child}>
        <Logo />
        <div className="flex items-center justify-center gap-1">
          <p className="font-mono text-xs lowercase text-foreground/30">by</p>
          <AnimatedLink
            className={cn("font-khand", "text-sm uppercase text-accent h-5")}
            id="name-link"
            href={"/"}
          >
            Sourav Rakshit
          </AnimatedLink>
        </div>
      </motion.div>
      <motion.div
        variants={child}
        className={cn(
          "font-khand",
          "flex flex-col items-end uppercase text-lg gap-1.5"
        )}
      >
        <AnimatedLink id="blog-link" variants={headerChild} href="/blog">
          Blog
        </AnimatedLink>
        <AnimatedLink
          id="contact-link"
          variants={headerChild}
          href="mailto:rakshitsourav3@gmail.com"
        >
          Contact
        </AnimatedLink>
        <AnimatedLink
          id="linkedin-link"
          variants={headerChild}
          target="_blank"
          href="https://www.linkedin.com/in/souravrax/"
        >
          Linkedin
        </AnimatedLink>
      </motion.div>
    </motion.div>
  );
}
