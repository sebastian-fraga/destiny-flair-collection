export const tierStyles: Record<
    string,
    { border: string; text: string; header: string }
> = {
    Leyenda: {
        border: "border-t-purple-400",
        text: "text-purple-400",
        header: "bg-[#4F3663]/80",
    },
    Peculiar: {
        border: "border-t-green-400",
        text: "text-green-400",
        header: "bg-[#567E9D]/80",
    },
};

export const defaultTier = {
    border: "border-t-white/10",
    text: "text-zinc-400",
    header: "bg-zinc-700",
};
