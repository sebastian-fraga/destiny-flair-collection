interface Props {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const buttonBase =
    "rounded-md border border-white/10 px-3 py-1.5 text-sm transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav
            aria-label="Paginación de secciones"
            className="mt-8 flex flex-wrap items-center justify-center gap-2 flex-1"
        >
            <button
                type="button"
                className={buttonBase}
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                Anterior
            </button>

            {pages.map((n) => (
                <button
                    key={n}
                    type="button"
                    aria-current={n === page ? "page" : undefined}
                    className={`${buttonBase} ${n === page ? "bg-white/15 font-semibold" : ""}`}
                    onClick={() => onChange(n)}
                >
                    {n}
                </button>
            ))}

            <button
                type="button"
                className={buttonBase}
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Siguiente
            </button>
        </nav>
    );
}
