import type { Shader } from "../types/shader.ts";
import { tierStyles, defaultTier } from "../utils/tierStyles.ts";

interface Props {
    id: string;
    shader: Shader;
}

export default function Tooltip({ id, shader }: Props) {
    const tier = tierStyles[shader.tier] ?? defaultTier;
    return (
        <div
            id={id}
            role="tooltip"
            className="pointer-events-none invisible absolute left-full z-10 mb-2 flex w-72 -translate-x-1/2 flex-col gap-1.5 bg-black/70 text-left opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100"
        >
            <div className={`flex flex-col px-2 py-2 gap-px ${tier.header}`}>
                <strong className="text-[16px]/4 font-medium uppercase">
                    {shader.name}
                </strong>

                <div className="flex justify-between tracking-wide text-white/70 text-[13px] pb-0.5">
                    <span>Shader</span>
                    <span className="opacity-50">{shader.tier}</span>
                </div>
            </div>

            <p className="text-xs">{shader.description}</p>

            {shader.sources.length > 0 ? (
                <ul className="list-disc pl-4 text-xs">
                    {shader.sources.map((source) => (
                        <li key={source}>{source}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-[11px] italic text-zinc-400">
                    Sin dato de cómo se consigue
                </p>
            )}

            {shader.note && (
                <p className="text-[11px] italic text-zinc-400">
                    {shader.note}
                </p>
            )}

            <span className="text-[10px] text-zinc-500">
                Dato: {shader.sourceOrigin}
            </span>
        </div>
    );
}
