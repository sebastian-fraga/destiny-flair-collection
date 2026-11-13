import type { FocusEvent, MouseEvent } from "react";
import { useId } from "react";
import type { Shader } from "../types/shader.ts";
import { defaultTier, tierStyles } from "../utils/tierStyles.ts";
import Tooltip from "./Tooltip";

const BUNGIE = "https://www.bungie.net";

interface Props {
    shader: Shader;
}

function followMouse(e: MouseEvent<HTMLLIElement>) {
    e.currentTarget.style.setProperty("--tx", `${e.clientX}px`);
    e.currentTarget.style.setProperty("--ty", `${e.clientY}px`);
}

function placeBesideCard(e: FocusEvent<HTMLLIElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", `${rect.right}px`);
    e.currentTarget.style.setProperty("--ty", `${rect.top}px`);
}

export default function ShaderCard({ shader }: Props) {
    const tooltipId = useId();
    const tier = tierStyles[shader.tier] ?? defaultTier;

    const isUnavailable = shader.obtainable === false;

    return (
        <li
            tabIndex={0}
            aria-describedby={tooltipId}
            onMouseMove={followMouse}
            onFocus={placeBesideCard}
            className={`group relative flex flex-col justify-center ${tier.border}`}
        >
            <img
                src={`${BUNGIE}${shader.icon}`}
                alt={shader.name}
                width={92}
                height={92}
                loading="lazy"
                className={`border-3 ${isUnavailable ? "border-white/50 brightness-50" : ""}`}
            />

            <Tooltip id={tooltipId} shader={shader} />
        </li>
    );
}
