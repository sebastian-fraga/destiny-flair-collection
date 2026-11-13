import { mkdir, readFile, writeFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";

const SHADER_BUCKET = 2973005342;
const OUT_DIR = "src/data";

const USE_MANIFEST_SOURCES = false;

const db = new DatabaseSync(".cache/world-es.sqlite", { readOnly: true });
const parse = (row) => JSON.parse(String(row.json));

let overrides = {};
try {
    overrides = JSON.parse(
        await readFile(`${OUT_DIR}/source-overrides.json`, "utf8"),
    );
} catch {
    console.log("(sin source-overrides.json)");
}

const sourceByHash = new Map(
    db
        .prepare("SELECT json FROM DestinyRewardSourceDefinition")
        .all()
        .map(parse)
        .map((s) => [s.sourceHash, s]),
);

const items = db
    .prepare("SELECT json FROM DestinyInventoryItemDefinition")
    .all()
    .map(parse);

const shaders = [];
let clasificados = 0;

for (const item of items) {
    if (item.bucketTypeHash !== SHADER_BUCKET) continue;

    if (!item.hasIcon || !item.tierTypeName) {
        clasificados++;
        continue;
    }

    const override = overrides[item.itemHash];
    const manifestSources = USE_MANIFEST_SOURCES
        ? (item.sourceHashes ?? [])
              .map((hash) => sourceByHash.get(hash)?.sourceName)
              .filter(Boolean)
        : [];

    let sources;
    let sourceOrigin;
    if (override?.sources?.length > 0) {
        sources = override.sources;
        sourceOrigin = "manual";
    } else if (manifestSources.length > 0) {
        sources = manifestSources;
        sourceOrigin = "manifest";
    } else {
        sources = [];
        sourceOrigin = "pendiente";
    }

    const obtainable =
        override?.obtainable === true || override?.obtainable === false
            ? override.obtainable
            : null;

    const section =
        typeof override?.section === "string" ? override.section.trim() : "";

    shaders.push({
        hash: item.itemHash,
        name: item.itemName,
        description: item.itemDescription,
        icon: item.icon,
        tier: item.tierTypeName,
        sources,
        sourceOrigin,
        obtainable,
        note: override?.note ?? "",
        section,
    });
}

shaders.sort((a, b) => a.name.localeCompare(b.name, "es"));

const porOrigen = {};
for (const s of shaders)
    porOrigen[s.sourceOrigin] = (porOrigen[s.sourceOrigin] ?? 0) + 1;

const porDisponibilidad = { true: 0, false: 0, sinRevisar: 0 };
for (const s of shaders) {
    if (s.obtainable === true) porDisponibilidad.true++;
    else if (s.obtainable === false) porDisponibilidad.false++;
    else porDisponibilidad.sinRevisar++;
}

const porsection = {};
for (const s of shaders) {
    const clave = s.section || "(sin asignar)";
    porsection[clave] = (porsection[clave] ?? 0) + 1;
}

console.log("Shaders guardados:", shaders.length);
console.log("Clasificados excluidos:", clasificados);
console.log("Por origen del dato:", porOrigen);
console.log(
    "Conseguibles (true) / no (false) / sin revisar:",
    porDisponibilidad,
);
console.log("Por sección:", porsection);

await mkdir(OUT_DIR, { recursive: true });
await writeFile(`${OUT_DIR}/shaders.json`, JSON.stringify(shaders, null, 2));
console.log(`Guardado en ${OUT_DIR}/shaders.json`);
