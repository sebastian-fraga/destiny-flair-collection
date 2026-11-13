import { DatabaseSync } from "node:sqlite";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const SHADER_BUCKET = 2973005342;
const OUT_DIR = "src/data";
const FILE = `${OUT_DIR}/source-overrides.json`;

const db = new DatabaseSync(".cache/world-es.sqlite", { readOnly: true });
const items = db
    .prepare("SELECT json FROM DestinyInventoryItemDefinition")
    .all()
    .map((row) => JSON.parse(String(row.json)));

let overrides = {};
try {
    overrides = JSON.parse(await readFile(FILE, "utf8"));
} catch {
    console.log("(no existía source-overrides.json, lo creo)");
}

let agregados = 0;
let completados = 0;

for (const item of items) {
    if (item.bucketTypeHash !== SHADER_BUCKET) continue;
    if (!item.hasIcon || !item.tierTypeName) continue;

    const existente = overrides[item.itemHash];

    if (!existente) {
        overrides[item.itemHash] = {
            name: item.itemName,
            sources: [],
            obtainable: null,
            note: "",
            section: "",
        };
        agregados++;
        continue;
    }

    let cambio = false;
    if (!("obtainable" in existente)) {
        existente.obtainable = null;
        cambio = true;
    }
    if (!("note" in existente)) {
        existente.note = "";
        cambio = true;
    }
    if (!("section" in existente)) {
        existente.section = "";
        cambio = true;
    }
    if (cambio) completados++;
}

await mkdir(OUT_DIR, { recursive: true });
await writeFile(FILE, JSON.stringify(overrides, null, 2));
console.log(
    `Nuevos: ${agregados} | Actualizados con campos nuevos: ${completados} | Total: ${Object.keys(overrides).length}`,
);
