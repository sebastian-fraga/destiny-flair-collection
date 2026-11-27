import { useCallback, useState } from "react";

export interface Pagination<T> {
    page: number;
    direction: 1 | -1;
    totalPages: number;
    pageItems: T[];
    goToPage: (page: number) => void;
}

export function usePagination<T>(items: T[], pageSize: number): Pagination<T> {
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState<1 | -1>(1);

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

    const start = (page - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);

    const goToPage = useCallback(
        (next: number) => {
            setDirection(next >= page ? 1 : -1);
            setPage(next);
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        [page],
    );

    return { page, direction, totalPages, pageItems, goToPage };
}
