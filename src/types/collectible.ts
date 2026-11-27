export interface CollectibleItem {
    hash: number;
    name: string;
    icon: string;
    tier: string;
    sources?: string[];
    obtainable?: boolean | null;
    note?: string;
}

export interface TooltipContext {
    hasBeenShown: boolean;
}
