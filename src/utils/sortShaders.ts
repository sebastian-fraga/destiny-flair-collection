import type { Shader } from "../types/shader.ts";

export function compareShaders(a: Shader, b: Shader) {
    if (a.order !== null && b.order !== null) {
        return a.order - b.order || a.name.localeCompare(b.name, "es");
    }
    if (a.order !== null) return -1;
    if (b.order !== null) return 1;
    return a.name.localeCompare(b.name, "es");
}
