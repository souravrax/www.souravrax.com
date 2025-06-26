"use client";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { projects } from "@/data";
import Link from "@/components/Link";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scaleProgress } = useScroll({
    target: container,
    offset: ["5vh start", "center start"],
    // smooth: 5,
  });
  const scale = useTransform(scaleProgress, [0, 1], [1, 0]);
  const coverScale = useTransform(scaleProgress, [0, 1], [1, 0]);
  const rounded = useTransform(scaleProgress, [0, 1], ["0rem", "20rem"]);
  return (
    <>
      <section className="h-[200vh] relative" ref={container}>
        <div className="bg-background text-background h-[100vh] flex flex-col items-center justify-center gap-20 sticky top-0 overflow-hidden">
          <motion.div
            style={{
              scale: coverScale,
              borderRadius: rounded,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute top-1/2 left-1/2 h-[100vh] w-[100vw] bg-foreground -z-10"
          />
          <motion.h1
            className={cn(
              "font-array",
              "text-7xl lg:text-[10rem] text-center px-4"
            )}
            style={{
              scale,
              opacity: scale,
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            Let&apos;s dive into my work
          </motion.h1>
        </div>
      </section>
      <ProjectsContent />
    </>
  );
}

function ProjectsContent() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "100vh center"],
  });
  const { scrollYProgress: projectCardScaleProgress } = useScroll({
    target: container,
    offset: ["200vh end", "end end"],
  });
  const scaleProjectText = useTransform(scrollYProgress, [0, 1], [20, 2]);
  return (
    <section className="relative" ref={container}>
      <div className="bg-background text-foreground h-[50vh] flex flex-col items-center justify-between gap-20 sticky top-0 overflow-hidden">
        <motion.h1
          className={cn("font-array", "text-7xl text-center px-4 py-10")}
          style={{
            scale: scaleProjectText,
            opacity: scrollYProgress,
          }}
        >
          Projects
        </motion.h1>
        <div className="flex justify-center items-center"></div>
      </div>
      {projects.map((project, i) => {
        const lowRange = i * (1 / projects.length);
        const scaleRange = 1 - (projects.length - i) * 0.05;
        return (
          <ProjectCard
            key={i}
            i={i}
            color={project.color}
            title={project.title}
            lowRange={lowRange}
            description={project.description}
            src={project.src}
            scrollYProgress={projectCardScaleProgress}
            previewLink={project.previewLink}
            scaleRange={scaleRange}
            projectImage={project.projectSrc}
            sourceCodeLink={project.sourceCodeLink}
            tech={project.tech ?? []}
          />
        );
      })}
    </section>
  );
}

function ProjectCard({
  i,
  color,
  title,
  description,
  src,
  lowRange,
  previewLink,
  sourceCodeLink,
  scrollYProgress,
  scaleRange,
  projectImage,
  tech,
}: {
  i: number;
  color: string;
  title: string;
  description: string;
  src: string;
  previewLink: string;
  sourceCodeLink?: string;
  lowRange: number;
  scaleRange: number;
  scrollYProgress: MotionValue<number>;
  projectImage?: string;
  tech: string[];
}) {
  const scale = useTransform(
    scrollYProgress,
    [lowRange, 1 + lowRange],
    [1, scaleRange]
  );
  const grayMotionValue = useTransform(scrollYProgress, [0, lowRange], [1, 0]);
  const grayscale = useTransform(grayMotionValue, (value) => {
    return `grayscale(${value})`;
  });
  const MotionImage = motion.img;
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 text-foreground rounded-3xl overflow-hidden">
      <motion.div
        className="flex flex-col relative h-2/3 w-5/6 rounded-3xl p-2 md:p-4 lg:p-6 origin-top overflow-hidden border-foreground"
        style={{
          top: `calc(-1vh + ${i * 25}px)`,
          scale,
        }}
      >
        <MotionImage
          src={`/images/project-card/${i + 1}.png`}
          className={cn("object-cover absolute -z-10")}
          style={{
            filter: grayscale as any,
          }}
          alt="image"
        />
        <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0 backdrop-blur-[1rem] [-webkit-backdrop-filter:blur(1rem)] rounded-3xl"></div>
        <div className="h-full w-full rounded-2xl grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-12 backdrop-blur-[4rem] [-webkit-backdrop-filter:blur(4rem)] bg-gray-900/30">
          <div className="rounded-3xl p-4 space-y-4">
            <h2
              className={cn(
                "text-2xl md:text-4xl lg:text-6xl font-bold text-accent",
                "font-array"
              )}
            >
              {title}
            </h2>
            <p className="text-xs md:text-xm lg:text-base">{description}</p>
            <ul className="flex gap-2 text-lg flex-wrap">
              {tech.map((tech, i) => {
                return (
                  <li
                    key={i}
                    className="rounded-md border border-foreground px-2 py-1 text-xs md:text-sm"
                  >
                    {tech}
                  </li>
                );
              })}
            </ul>

            <hr />
            <div
              id="project-links"
              className="flex gap-2 items-center text-xs md:text-sm"
            >
              <Link
                href={previewLink}
                target="_blank"
                className="rounded-full py-1 md:py-2 px-2 md:px-4 border border-foreground flex items-center gap-2 transition-all hover:gap-3"
              >
                Demo
                <ArrowRight size={16} />
              </Link>
              {sourceCodeLink && (
                <Link
                  href={sourceCodeLink}
                  target="_blank"
                  className="rounded-full py-2 px-4 border border-foreground flex items-center gap-2 transition-all hover:gap-3"
                >
                  Code
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-3xl p-4">
            <div className="h-full w-full relative rounded-2xl overflow-hidden">
              {projectImage && (
                <motion.img
                  src={`/images/projects/${projectImage}`}
                  className="object-cover absolute"
                  alt="image"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
