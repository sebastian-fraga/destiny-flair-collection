/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

interface Props {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const kbdClasses =
        "bg-white text-black font-body w-6 h-6 flex items-center justify-center rounded-sm text-sm shadow-md";

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLElement &&
                (event.target.isContentEditable ||
                    ["INPUT", "TEXTAREA"].includes(event.target.tagName))
            ) {
                return;
            }

            if (event.key.toLowerCase() === "q" && page > 1) {
                onChange(page - 1);
            }

            if (event.key.toLowerCase() === "e" && page < totalPages) {
                onChange(page + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [page, totalPages, onChange]);

    return (
        <div className="relative isolate drop-shadow-2xl">
            <div className="absolute bottom-0 left-1/2 h-2 w-screen -translate-x-1/2 bg-linear-90 from-white" />
            <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[#929D9D]" />
            <nav
                aria-label="Paginación de secciones"
                className="mt-2 flex flex-wrap items-center justify-center gap-8 flex-1 pb-5 pt-14"
            >
                <kbd className={kbdClasses}>Q</kbd>
                {pages.map((n) => (
                    <button
                        key={n}
                        type="button"
                        aria-current={n === page ? "page" : undefined}
                        className={`${n === page ? "text-white" : "text-white/60 cursor-pointer hover:text-white/80"} transition-colors text-xl `}
                        onClick={() => onChange(n)}
                    >
                        colección {n}
                    </button>
                ))}
                <kbd className={kbdClasses}>E</kbd>
            </nav>
        </div>
    );
}
