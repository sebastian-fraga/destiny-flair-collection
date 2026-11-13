import { useId, useState } from "react";
import { useCanHover } from "../hooks/useMediaQuery.ts";
import type { Shader } from "../types/shader.ts";
import { defaultTier, tierStyles } from "../utils/tierStyles.ts";
import Tooltip from "./Tooltip.tsx";

const BUNGIE = "https://www.bungie.net";

interface Props {
    shader: Shader;
}

export default function ShaderCard({ shader }: Props) {
    const tooltipId = useId();
    const tier = tierStyles[shader.tier] ?? defaultTier;
    const canHover = useCanHover();

    const isUnavailable = shader.obtainable === false;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (!canHover) return;
        setTooltipPos({ x: e.clientX, y: e.clientY });
    }

    return (
        <span
            className={`group relative flex flex-col justify-center ${tier.border}`}
        >
            <button
                type="button"
                onMouseMove={onMouseMove}
                onMouseEnter={() => canHover && setIsHovered(true)}
                onMouseLeave={() => canHover && setIsHovered(false)}
                onClick={() => {
                    if (!canHover) setIsOpen(true);
                }}
                aria-describedby={canHover ? tooltipId : undefined}
                aria-haspopup={canHover ? undefined : "dialog"}
                className="shader-card block w-full cursor-pointer"
            >
                <div className="relative">
                    <img
                        src={`${BUNGIE}${shader.icon}`}
                        alt={shader.name}
                        width={92}
                        height={92}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`aspect-square w-full border-3 transition-[opacity,scale] duration-100 hover:scale-105 sm:w-23 sm:h-23 ${
                            isUnavailable ? "border-white/50 brightness-50" : ""
                        } ${!isLoaded ? "opacity-0" : "opacity-100"}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsLoaded(true)}
                    />
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent animate-pulse">
                            <div className="spin-slow w-8 h-8 border-3 border-white/40 border-t-current rounded-full" />
                        </div>
                    )}
                </div>
            </button>

            {canHover ? (
                <Tooltip
                    id={tooltipId}
                    shader={shader}
                    pos={tooltipPos}
                    visible={isHovered}
                />
            ) : (
                <Tooltip
                    id={tooltipId}
                    shader={shader}
                    pos={tooltipPos}
                    visible={isOpen}
                    variant="modal"
                    onClose={() => setIsOpen(false)}
                />
            )}
        </span>
    );
}
