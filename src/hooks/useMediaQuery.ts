import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia(query).matches,
    );

    useEffect(() => {
        const mql = window.matchMedia(query);

        function onChange() {
            setMatches(mql.matches);
        }

        onChange();
        mql.addEventListener("change", onChange);

        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}

export function useCanHover() {
    return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useIsMobile() {
    return useMediaQuery("(max-width: 639px)");
}
