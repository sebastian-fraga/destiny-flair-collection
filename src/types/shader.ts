import type { CollectibleItem } from "./collectible.ts";

export interface Shader extends CollectibleItem {
    description: string;

    sources: string[];
    sourceOrigin: "manual" | "manifest" | "pendiente";
    obtainable: boolean | null;
    note: string;
    section: string;
    order: number | null;
}
