import { useState } from "react";
import type { CollectibleItem } from "../../types/collectible.ts";

const BUNGIE = "https://www.bungie.net";

interface ItemIconProps<T extends CollectibleItem> {
    item: T;
}

export default function ItemIcon<T extends CollectibleItem>({
    item,
}: ItemIconProps<T>) {
    const [isLoaded, setIsLoaded] = useState(false);

    const isUnavailable = item.obtainable === false;

    return (
        <div className="relative">
            <img
                src={`${BUNGIE}${item.icon}`}
                alt={item.name}
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
    );
}
