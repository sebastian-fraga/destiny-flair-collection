import type { Shader } from "../types/shader.ts";
import { useId } from "react";
import Tooltip from "./Tooltip";

const BUNGIE = "https://www.bungie.net";

const tierStyles: Record<string, { border: string; text: string }> = {
    Leyenda: { border: "border-t-purple-400", text: "text-purple-400" },
    Peculiar: { border: "border-t-blue-400", text: "text-blue-400" },
    Común: { border: "border-t-zinc-300", text: "text-zinc-300" },
};

const defaultTier = { border: "border-t-white/10", text: "text-zinc-400" };

interface Props {
    shader: Shader; // SIN id: este componente no lo recibe
}

export default function ShaderCard({ shader }: Props) {
    const tooltipId = useId(); 
    const tier = tierStyles[shader.tier] ?? defaultTier;

    return (
        <li
            tabIndex={0}
            aria-describedby={tooltipId}
            className={`group relative flex min-w-60 flex-col items-center justify-center gap-2 rounded-md px-2 py-5 ${tier.border}`}
        >
            <img
                src={`${BUNGIE}${shader.icon}`}
                alt={shader.name}
                width={64}
                height={64}
                loading="lazy"
            />

            <Tooltip id={tooltipId} shader={shader} />
        </li>
    );
}
