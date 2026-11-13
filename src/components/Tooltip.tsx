import type { Shader } from "../types/shader.ts";
import { defaultTier, tierStyles } from "../utils/tierStyles.ts";

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
            className="pointer-events-none invisible fixed top-(--ty) left-(--tx) z-10 ml-6 flex w-82 flex-col bg-black/80 text-left opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100"
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
        </div>
    );
}
