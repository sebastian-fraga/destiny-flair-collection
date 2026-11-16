import type { CollectibleItem } from "../../types/collectible.ts";
import { defaultTier, tierStyles } from "../../utils/tierStyles.ts";

const BUNGIE = "https://www.bungie.net";

interface Props {
    item: CollectibleItem;
    /** Etiqueta del tipo de ítem: "Shader", "Emblema", ... */
    typeLabel: string;
    /** Banner ancho opcional (474x96). Se renderiza arriba del contenido. */
    banner?: string;
}

export default function ItemTooltipContent({
    item,
    typeLabel,
    banner,
}: Props) {
    const tier = tierStyles[item.tier] ?? defaultTier;

    return (
        <>
            {banner && (
                <img
                    src={`${BUNGIE}${banner}`}
                    alt=""
                    width={474}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="block w-full h-auto aspect-[474/96] object-cover"
                />
            )}

            <div
                className={`flex flex-col px-3 pt-2.5 pb-0 gap-px ${tier.header}`}
            >
                <strong className="text-[18px]/5 text-slate-50 font-medium uppercase tracking-wide">
                    {item.name}
                </strong>

                <div className="flex justify-between tracking-wide text-[14px] pb-1">
                    <span className="opacity-80 tracking-wide">{typeLabel}</span>
                    <span className="opacity-30">{item.tier}</span>
                </div>
            </div>

            {item.obtainable === false && (
                <div className="bg-red-400/70 px-3">Ya no se puede obtener</div>
            )}

            {item.note && (
                <p className="text-[13px]/5 italic text-zinc-300/90 pt-1 pb-2 px-3">
                    {item.note}
                </p>
            )}
        </>
    );
}
