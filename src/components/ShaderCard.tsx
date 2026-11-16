import { useId, useState } from "react";
import { useCanHover } from "../hooks/useMediaQuery.ts";
import type { Shader } from "../types/shader.ts";
import { defaultTier, tierStyles } from "../utils/tierStyles.ts";
import ItemIcon from "./collectible/ItemIcon.tsx";
import ItemTooltipContent from "./collectible/ItemTooltipContent.tsx";
import Tooltip from "./collectible/Tooltip.tsx";

interface Props {
    shader: Shader;
}

export default function ShaderCard({ shader }: Props) {
    const tooltipId = useId();
    const tier = tierStyles[shader.tier] ?? defaultTier;
    const canHover = useCanHover();

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
                <ItemIcon item={shader} />
            </button>

            {canHover ? (
                <Tooltip
                    id={tooltipId}
                    pos={tooltipPos}
                    visible={isHovered}
                >
                    <ItemTooltipContent item={shader} typeLabel="Shader" />
                </Tooltip>
            ) : (
                <Tooltip
                    id={tooltipId}
                    pos={tooltipPos}
                    visible={isOpen}
                    variant="modal"
                    onClose={() => setIsOpen(false)}
                >
                    <ItemTooltipContent item={shader} typeLabel="Shader" />
                </Tooltip>
            )}
        </span>
    );
}
