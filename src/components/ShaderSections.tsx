import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Shader } from "../types/shader.ts";
import { buildSections, MAX_PER_SECTION } from "../utils/groupShaders.ts";
import ShaderCard from "./ShaderCard";

export const SECTIONS_PER_PAGE = 6;

const TRANSITION = {
    duration: 0.55,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
};

interface Props {
    shaders: Shader[];
    page: number;
    direction: 1 | -1;
}

function ShaderPlaceholder() {
    return (
        <div className="relative w-23 h-23 bg-transparent">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />
        </div>
    );
}

export default function ShaderSections({ shaders, page, direction }: Props) {
    const gridRef = useRef<HTMLDivElement>(null);
    const sections = useMemo(() => buildSections(shaders), [shaders]);
    const start = (page - 1) * SECTIONS_PER_PAGE;
    const visibleSections = sections.slice(start, start + SECTIONS_PER_PAGE);

    const variants = {
        enter: {
            opacity: 0,
        },
        center: {
            opacity: 1,
        },
        exit: (direction: number) => {
            const rect = gridRef.current?.getBoundingClientRect();

            const distance = (rect?.width ?? window.innerWidth) * 0.85;

            return {
                x: direction > 0 ? -distance : distance,
                opacity: 0,
            };
        },
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={page}
                ref={gridRef}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={TRANSITION}
                className="mt-8 grid grid-cols-1 gap-y-8 lg:grid-cols-2 justify-items-start"
            >
                {visibleSections.map((section) => {
                    const padded = [
                        ...section.shaders,
                        ...Array(MAX_PER_SECTION - section.shaders.length).fill(
                            null,
                        ),
                    ];

                    return (
                        <section key={section.title} className="max-w-200">
                            <h2 className="text-xl font-medium uppercase tracking-wide text-slate-200/90">
                                {section.title}{" "}
                            </h2>
                            <div className="w-full bg-slate-200 h-px mb-2"></div>
                            <ul className="grid max-w-200 grid-cols-6 gap-1.5">
                                {padded.map((shader, i) => (
                                    <li
                                        key={
                                            shader
                                                ? shader.hash
                                                : `${section.title}-placeholder-${i}`
                                        }
                                    >
                                        {shader ? (
                                            <ShaderCard shader={shader} />
                                        ) : (
                                            <ShaderPlaceholder />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
}
