import { useEffect, useRef, useState } from "react";

interface Props {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
    ariaLabel?: string;
    label?: string;
}

export default function Pagination({
    page,
    totalPages,
    onChange,
    ariaLabel = "Paginación",
    label = "colección",
}: Props) {
    const lastKeyPress = useRef(0);
    const KEY_DELAY = 500;

    const [activeKey, setActiveKey] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLElement &&
                (event.target.isContentEditable ||
                    ["INPUT", "TEXTAREA"].includes(event.target.tagName))
            ) {
                return;
            }

            const key = event.key.toLowerCase();

            if (key !== "q" && key !== "e") return;

            setActiveKey(key);

            const now = Date.now();

            if (now - lastKeyPress.current < KEY_DELAY) return;

            if (key === "q" && page > 1) {
                lastKeyPress.current = now;
                onChange(page - 1);
            }

            if (key === "e" && page < totalPages) {
                lastKeyPress.current = now;
                onChange(page + 1);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            if (key === "q" || key === "e") {
                setActiveKey(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [page, totalPages, onChange]);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const kbdClasses =
        "hidden md:flex bg-white text-black font-body w-6 h-6 items-center justify-center rounded-sm text-sm shadow-[0_3px_0_#999] inset-shadow-[0_1px_2px_#00000040] transition-all";

    return (
        <div className="relative isolate drop-shadow-2xl">
            <div className="absolute bottom-0 left-1/2 h-2 w-screen -translate-x-1/2 bg-linear-90 from-white" />
            <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[#929D9D]" />
            <nav
                aria-label={ariaLabel}
                className="mt-2 flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 pb-5 pt-14 sm:gap-x-8"
            >
                <kbd
                    className={`${kbdClasses} ${
                        activeKey === "q"
                            ? "translate-y-0.5 shadow-[0_1px_0_#999] inset-shadow-[0_2px_12px_#00000020] bg-white/90"
                            : ""
                    }`}
                >
                    Q
                </kbd>
                {pages.map((n) => (
                    <button
                        key={n}
                        type="button"
                        aria-current={n === page ? "page" : undefined}
                        className={`${
                            n === page
                                ? "text-white"
                                : "text-white/40 cursor-pointer hover:text-white/80"
                        } transition-colors text-base sm:text-xl `}
                        onClick={() => onChange(n)}
                    >
                        {`${label} ${n}`}
                    </button>
                ))}
                <kbd
                    className={`${kbdClasses} ${
                        activeKey === "e"
                            ? "translate-y-0.5 shadow-[0_1px_0_#999] inset-shadow-[0_2px_12px_#00000020] bg-white/90"
                            : ""
                    }`}
                >
                    E
                </kbd>
            </nav>
        </div>
    );
}
