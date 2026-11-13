import { useState } from "react";
import Pagination from "./components/Pagination";
import ShaderSections, { SECTIONS_PER_PAGE } from "./components/ShaderSections";
import shadersData from "./data/shaders.json";
import type { Shader } from "./types/shader.ts";
import { buildSections } from "./utils/groupShaders.ts";
import "/src/styles/App.css";

const shaders = shadersData as unknown as Shader[];

export default function App() {
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState<1 | -1>(1);

    const sections = buildSections(shaders);
    const totalPages = Math.max(
        1,
        Math.ceil(sections.length / SECTIONS_PER_PAGE),
    );

    function goToPage(next: number) {
        setDirection(next >= page ? 1 : -1);
        setPage(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <main className="relative flex flex-col">
            <header className="flex flex-col items-start gap-12 mb-2 -mt-2 relative">
                <div className="mx-auto">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={goToPage}
                    />
                </div>
                <h1 className="text-6xl uppercase tracking-wide text-white font-medium">
                    Colección de shaders de Destiny
                </h1>
            </header>

            <ShaderSections
                shaders={shaders}
                page={page}
                direction={direction}
            />
        </main>
    );
}
