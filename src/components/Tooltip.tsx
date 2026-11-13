import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Shader } from "../types/shader.ts";
import { defaultTier, tierStyles } from "../utils/tierStyles.ts";

interface Props {
    id: string;
    shader: Shader;
    pos: { x: number; y: number };
    visible: boolean;
}

const CURSOR_GAP = 16;
const VIEWPORT_GAP = 8;

export default function Tooltip({ id, shader, pos, visible }: Props) {
    const tipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ top: 0, left: 0 });
    const tier = tierStyles[shader.tier] ?? defaultTier;

    useLayoutEffect(() => {
        const el = tipRef.current;
        if (!el) return;

        const { offsetWidth: width, offsetHeight: height } = el;

        let left = pos.x + CURSOR_GAP;
        let top = pos.y + CURSOR_GAP;

        if (left + width > window.innerWidth - VIEWPORT_GAP) {
            left = pos.x - CURSOR_GAP - width;
        }
        if (top + height > window.innerHeight - VIEWPORT_GAP) {
            top = pos.y - CURSOR_GAP - height;
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
    }, [pos, shader]);

    return createPortal(
        <div
            ref={tipRef}
            id={id}
            role="tooltip"
            className="pointer-events-none fixed z-10 flex w-82 flex-col bg-black/80 text-left transition-opacity duration-150"
            style={{ ...style, opacity: visible ? 1 : 0 }}
        >
            <div
                className={`flex flex-col px-3 pt-2.5 pb-0 gap-px ${tier.header}`}
            >
                <strong className="text-[18px]/5 text-slate-50 font-medium uppercase tracking-wide">
                    {shader.name}
                </strong>
                <div className="flex justify-between tracking-wide text-[14px] pb-1">
                    <span className="opacity-80 tracking-wide">Shader</span>
                    <span className="opacity-30">{shader.tier}</span>
                </div>
            </div>

            {shader.obtainable === false && (
                <div className="bg-red-400/70 px-3">Ya no se puede obtener</div>
            )}

            {shader.note && (
                <p className="text-[13px]/5 italic text-zinc-300/90 pt-1 pb-2 px-3">
                    {shader.note}
                </p>
            )}
        </div>,
        document.body,
    );
}
