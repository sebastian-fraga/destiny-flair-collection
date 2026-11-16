import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Props {
    id: string;
    pos: { x: number; y: number };
    visible: boolean;
    variant?: "tooltip" | "modal";
    onClose?: () => void;
    children: ReactNode;
}

const CURSOR_GAP = 70;
const VIEWPORT_GAP = 12;

export default function Tooltip({
    id,
    pos,
    visible,
    variant = "tooltip",
    onClose,
    children,
}: Props) {
    const tipRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [style, setStyle] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (variant === "modal") return;

        const el = tipRef.current;
        if (!el) return;

        const { offsetWidth: width, offsetHeight: height } = el;

        let left = pos.x + CURSOR_GAP;
        let top = pos.y - height / 2;

        if (left + width > window.innerWidth - VIEWPORT_GAP) {
            left = pos.x - CURSOR_GAP - width;
        }

        const maxLeft = Math.max(
            VIEWPORT_GAP,
            window.innerWidth - width - VIEWPORT_GAP,
        );

        const maxTop = Math.max(
            VIEWPORT_GAP,
            window.innerHeight - height - VIEWPORT_GAP,
        );

        left = Math.min(Math.max(left, VIEWPORT_GAP), maxLeft);
        top = Math.min(Math.max(top, VIEWPORT_GAP), maxTop);

        setStyle({ top, left });
    }, [pos, children, variant]);

    useEffect(() => {
        if (variant !== "modal") return;

        const dialog = dialogRef.current;
        if (!dialog) return;

        if (visible && !dialog.open) {
            dialog.showModal();
        } else if (!visible && dialog.open) {
            dialog.close();
        }
    }, [visible, variant]);

    return createPortal(
        variant === "modal" ? (
            <dialog
                ref={dialogRef}
                id={id}
                onClose={onClose}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        dialogRef.current?.close();
                    }
                }}
                className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-82 flex-col bg-black/90 p-0 text-left text-white backdrop:bg-black/70"
            >
                <div className="flex items-center justify-end px-2 pt-2">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        aria-label="Cerrar"
                        className="cursor-pointer px-2 py-1 text-white/60 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </dialog>
        ) : (
            <div
                ref={tipRef}
                id={id}
                role="tooltip"
                className="pointer-events-none fixed z-10 flex w-82 flex-col bg-black/80 text-left transition-opacity duration-150"
                style={{ ...style, opacity: visible ? 1 : 0 }}
            >
                {children}
            </div>
        ),
        document.body,
    );
}
