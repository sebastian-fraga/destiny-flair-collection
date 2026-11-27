import DestinyShaderIcon from "../components/DestinyShaderIcon.tsx";
import Pagination from "../components/Pagination";
import ShaderSections, { SECTIONS_PER_PAGE } from "../components/ShaderSections";
import shadersData from "../data/shaders.json";
import { usePagination } from "../hooks/usePagination.ts";
import "../styles/App.css";
import type { Shader } from "../types/shader.ts";
import { buildSections } from "../utils/groupShaders.ts";

const shaders = shadersData as unknown as Shader[];
const sections = buildSections(shaders);

export default function ShadersPage() {
    const { page, direction, totalPages, pageItems, goToPage } =
        usePagination(sections, SECTIONS_PER_PAGE);

    return (
        <div className="relative">
            <main className="relative flex flex-col">
                <header className="flex flex-col items-start gap-6 sm:gap-12 mb-2 -mt-2 relative">
                    <div className="mx-auto w-full">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onChange={goToPage}
                            ariaLabel="Paginación de secciones"
                        />
                    </div>
                    <h1 className="text-3xl uppercase tracking-wide text-white font-medium sm:text-5xl lg:text-6xl">
                        Colección de shaders de Destiny
                    </h1>
                </header>

                <ShaderSections
                    sections={pageItems}
                    page={page}
                    direction={direction}
                />
            </main>

            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 overflow-clip"
            >
                <div className="absolute left-0 top-25 size-60 opacity-2">
                    <DestinyShaderIcon />
                </div>
            </div>
        </div>
    );
}
