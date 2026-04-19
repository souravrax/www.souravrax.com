"use client";
import { cn } from "@/lib/utils";
import { animate, motion, stagger, useMotionValue } from "motion/react";
import React, { useEffect } from "react";

const MotionLink = motion.a;

export default function AnimatedLink({
    className,
    id = "wavy",
    ...props
}: Omit<React.ComponentProps<typeof MotionLink>, "children"> & {
    children: string;
}) {
    const text = props.children;
    const chars = text.split("");

    const y = useMotionValue("0%");

    const waveStart = () => {
        animate(
            `#${id}`,
            { y: "-100%" },
            {
                delay: stagger(0.025),
                duration: 0.4,
                ease: "easeInOut",
            }
        );
    };

    const lineStart = () => {
        animate(
            `#${id}-line`,
            { width: "100%" },
            {
                delay: stagger(0.025),
                duration: 0.4,
                ease: "easeInOut",
            }
        );
    };

    const waveEnd = () => {
        animate(
            `#${id}`,
            { y: "0%" },
            {
                delay: stagger(0.025),
                duration: 0.4,
                ease: "easeInOut",
            }
        );
    };

    const lineEnd = () => {
        animate(
            `#${id}-line`,
            { width: "0%" },
            {
                delay: stagger(0.025),
                duration: 0.4,
                ease: "easeInOut",
            }
        );
    };

    useEffect(() => {
        const delay = 1000;
        setTimeout(() => {
            waveStart();
        }, delay);
        setTimeout(() => {
            waveEnd();
        }, delay + 1000);
    }, []);

    return (
        <MotionLink {...props} className={cn("h-7 relative", className)}>
            <motion.div
                className="flex items-start overflow-hidden h-full"
                onHoverStart={() => {
                    waveStart();
                    lineStart();
                }}
                onHoverEnd={() => {
                    waveEnd();
                    lineEnd();
                }}
            >
                {chars.map((char, index) => (
                    <motion.ul
                        key={index}
                        style={{ y }}
                        className="flex flex-col gap-0"
                    >
                        <li
                            id={id}
                            className=""
                            style={{
                                visibility: char === " " ? "hidden" : "visible",
                            }}
                        >
                            {char === " " ? "-" : char}
                        </li>
                        <li
                            id={id}
                            className=""
                            style={{
                                visibility: char === " " ? "hidden" : "visible",
                            }}
                        >
                            {char === " " ? "-" : char}
                        </li>
                    </motion.ul>
                ))}
            </motion.div>
            <motion.div
                className="absolute bottom-[-1px] h-[1px] bg-accent"
                id={`${id}-line`}
            ></motion.div>
        </MotionLink>
    );
}
