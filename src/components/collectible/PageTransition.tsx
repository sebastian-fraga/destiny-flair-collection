import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface Props {
    page: number;
    direction: 1 | -1;
    className?: string;
    children: ReactNode;
}

const TRANSITION = {
    duration: 0.6,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
};

/**
 * Transicion entre paginas: la variante `exit` mide este mismo elemento
 * (el motion.div) para calcular cuanto tiene que deslizarse para salir
 * completamente del viewport.
 */
export default function PageTransition({
    page,
    direction,
    className,
    children,
}: Props) {
    const gridRef = useRef<HTMLDivElement>(null);

    const variants = {
        enter: {
            opacity: 0,
        },
        center: {
            opacity: 1,
        },
        exit: (direction: number) => {
            const rect = gridRef.current?.getBoundingClientRect();

            const distance = rect
                ? direction > 0
                    ? window.innerWidth - rect.left
                    : rect.right
                : window.innerWidth;

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
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
