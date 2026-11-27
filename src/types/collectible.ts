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

/**
 * Contexto que se pasa al callback `renderTooltip` de ItemCard.
 *
 * `hasBeenShown` se pone en true la primera vez que el usuario hace hover o
 * tap sobre el ítem, y nunca vuelve a false. Sirve para diferir cargas
 * costosas (por ejemplo, el banner de un emblema) hasta la primera interacción.
 */
export interface TooltipContext {
    hasBeenShown: boolean;
}
