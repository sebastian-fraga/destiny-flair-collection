export type Shader = {
    hash: number;
    name: string;
    description: string;
    icon: string;
    tier: string;
    sources: string[];
    sourceOrigin: "manual" | "manifest" | "pendiente";
    obtainable: boolean | null;
    note: string;
    section: string;
    order: number | null;
};
