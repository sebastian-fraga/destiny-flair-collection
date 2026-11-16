import type { CollectibleItem } from "./collectible.ts";

export interface Shader extends CollectibleItem {
    /** Solo los shaders la traen en el manifest. */
    description: string;

    sources: string[];
    sourceOrigin: "manual" | "manifest" | "pendiente";
    obtainable: boolean | null;
    note: string;
    section: string;
    order: number | null;
}
