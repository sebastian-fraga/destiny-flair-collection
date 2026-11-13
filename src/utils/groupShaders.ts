import type { Shader } from "../types/shader.ts";
import { SECTION_ORDER, NO_SECTION } from "./sections.ts";
import { toRoman } from "./roman.ts";
import { compareShaders } from "./sortShaders.ts";

export const MAX_PER_SECTION = 12;

export interface ShaderSection {
    title: string;
    shaders: Shader[];
}

function splitSection(name: string, list: Shader[]): ShaderSection[] {
    const parts: ShaderSection[] = [];

    for (let i = 0; i < list.length; i += MAX_PER_SECTION) {
        const partNumber = i / MAX_PER_SECTION + 1;
        parts.push({
            title: partNumber === 1 ? name : `${name} ${toRoman(partNumber)}`,
            shaders: list.slice(i, i + MAX_PER_SECTION),
        });
    }

    return parts;
}

export function buildSections(shaders: Shader[]): ShaderSection[] {
    const groups = new Map<string, Shader[]>();
    for (const shader of shaders) {
        const key = shader.section || NO_SECTION;
        groups.set(key, [...(groups.get(key) ?? []), shader]);
    }

    const known = SECTION_ORDER.filter((name) => groups.has(name));
    const extra = [...groups.keys()]
        .filter((name) => !SECTION_ORDER.includes(name) && name !== NO_SECTION)
        .sort((a, b) => a.localeCompare(b, "es"));
    const orderedNames = [
        ...known,
        ...extra,
        ...(groups.has(NO_SECTION) ? [NO_SECTION] : []),
    ];

    return orderedNames.flatMap((name) => {
        const sorted = [...(groups.get(name) ?? [])].sort(compareShaders);
        return splitSection(name, sorted);
    });
}
