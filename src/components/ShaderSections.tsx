import type { ShaderSection } from "../utils/groupShaders.ts";
import { MAX_PER_SECTION } from "../utils/groupShaders.ts";
import PageTransition from "./collectible/PageTransition.tsx";
import ShaderCard from "./ShaderCard";

export const SECTIONS_PER_PAGE = 5;

interface Props {
    sections: ShaderSection[];
    page: number;
    direction: 1 | -1;
}

function ShaderPlaceholder() {
    return (
        <div className="relative aspect-square w-full bg-transparent">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />
        </div>
    );
}

export default function ShaderSections({ sections, page, direction }: Props) {
    return (
        <PageTransition
            page={page}
            direction={direction}
            className="mt-8 grid grid-cols-1 gap-y-8 lg:grid-cols-2 justify-items-start"
        >
            {sections.map((section) => {
                const padded = [
                    ...section.shaders,
                    ...Array(MAX_PER_SECTION - section.shaders.length).fill(
                        null,
                    ),
                ];

                return (
                    <section key={section.title} className="max-w-200">
                        <h2 className="text-xl font-medium uppercase tracking-wide text-slate-200/90">
                            {section.title}
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
        </PageTransition>
    );
}
