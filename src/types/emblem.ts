import type { CollectibleItem } from "./collectible.ts";

export interface Emblem extends CollectibleItem {
    /** Banner ancho del emblema (474x96). Vive en el manifest como secondaryIcon. */
    header: string;
}
