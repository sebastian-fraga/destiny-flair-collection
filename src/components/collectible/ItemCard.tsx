import { useId, useState } from "react";
import type { ReactNode } from "react";
import { useCanHover } from "../../hooks/useMediaQuery.ts";
import type { CollectibleItem, TooltipContext } from "../../types/collectible.ts";
import { defaultTier, tierStyles } from "../../utils/tierStyles.ts";
import ItemIcon from "./ItemIcon.tsx";
import Tooltip from "./Tooltip.tsx";

interface Props<T extends CollectibleItem> {
    item: T;
    renderTooltip: (item: T, context: TooltipContext) => ReactNode;
}

export default function ItemCard<T extends CollectibleItem>({
    item,
    renderTooltip,
}: Props<T>) {
    const tooltipId = useId();
    const tier = tierStyles[item.tier] ?? defaultTier;
    const canHover = useCanHover();

    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        if (!canHover) return;
        setTooltipPos({ x: e.clientX, y: e.clientY });
    }

    const content = renderTooltip(item, { hasBeenShown });

    return (
        <span
            className={`group relative flex flex-col justify-center ${tier.border}`}
        >
            <button
                type="button"
                onMouseMove={onMouseMove}
                onMouseEnter={() => {
                    if (!canHover) return;
                    setIsHovered(true);
                    setHasBeenShown(true);
                }}
                onMouseLeave={() => canHover && setIsHovered(false)}
                onClick={() => {
                    if (!canHover) {
                        setIsOpen(true);
                        setHasBeenShown(true);
                    }
                }}
                aria-describedby={canHover ? tooltipId : undefined}
                aria-haspopup={canHover ? undefined : "dialog"}
                className="item-card block w-full cursor-pointer"
            >
                <ItemIcon item={item} />
            </button>

            {canHover ? (
                <Tooltip id={tooltipId} pos={tooltipPos} visible={isHovered}>
                    {content}
                </Tooltip>
            ) : (
                <Tooltip
                    id={tooltipId}
                    pos={tooltipPos}
                    visible={isOpen}
                    variant="modal"
                    onClose={() => setIsOpen(false)}
                >
                    {content}
                </Tooltip>
            )}
        </span>
    );
}
