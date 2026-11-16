/**
 * Núcleo común de cualquier ítem coleccionable de Destiny 1 (shaders, emblemas).
 *
 * Deliberadamente NO incluye `description`: solo los shaders la tienen en el
 * manifest, así que vive en el tipo `Shader` y no acá.
 * Tampoco incluye `header` (el banner ancho): solo los emblemas lo tienen.
 */
export interface CollectibleItem {
    hash: number;
    name: string;
    icon: string;
    tier: string;

    /** De dónde se puede conseguir. Lo carga el overrides manual. */
    sources?: string[];
    /** true = se puede conseguir, false = ya no, null/undefined = sin datos. */
    obtainable?: boolean | null;
    /** Nota del overrides manual. */
    note?: string;
}
