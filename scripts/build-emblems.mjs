import { DatabaseSync } from "node:sqlite";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const EMBLEM_BUCKET = 4274335291;
const OUT_DIR = "src/data";

const RARITY_ORDER = [
    "Excepcional",
    "Leyenda",
    "Peculiar",
    "Poco común",
    "Común",
];

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

const items = db
    .prepare("SELECT json FROM DestinyInventoryItemDefinition")
    .all()
    .map(parse);

const emblems = [];
let ocultos = 0;
let sinIcon = 0;
let sinBanner = 0;
let conOverrides = 0;

for (const item of items) {
    if (item.bucketTypeHash !== EMBLEM_BUCKET) continue;

    const override = overrides[item.itemHash];

    if (override?.hidden === true) {
        ocultos++;
        continue;
    }

    if (!item.icon) {
        sinIcon++;
        console.log(
            `  (sin icono) ${item.itemHash} | ${item.itemName}`,
        );
        continue;
    }

    if (!item.secondaryIcon) {
        sinBanner++;
        console.log(
            `  (sin banner) ${item.itemHash} | ${item.itemName}`,
        );
        continue;
    }

    const emblem = {
        hash: item.itemHash,
        name: item.itemName,
        icon: item.icon,
        header: item.secondaryIcon,
        tier: item.tierTypeName,
    };

    if (override) {
        conOverrides++;

        if (override.sources !== undefined) emblem.sources = override.sources;
        if (override.obtainable !== undefined)
            emblem.obtainable = override.obtainable;
        if (override.note !== undefined) emblem.note = override.note;
    }

    emblems.push(emblem);
}

const rankOf = (tier) => {
    const index = RARITY_ORDER.indexOf(tier);
    return index === -1 ? RARITY_ORDER.length : index;
};

emblems.sort(
    (a, b) =>
        rankOf(a.tier) - rankOf(b.tier) ||
        a.name.localeCompare(b.name, "es") ||
        a.hash - b.hash,
);

const porRareza = {};
for (const e of emblems)
    porRareza[e.tier] = (porRareza[e.tier] ?? 0) + 1;

const conSources = emblems.filter((e) => e.sources !== undefined).length;
const conObtainable = emblems.filter((e) => e.obtainable !== undefined).length;
const conNote = emblems.filter((e) => e.note !== undefined).length;

console.log("Emblemas guardados:", emblems.length);
console.log("Ocultos por hidden:", ocultos);
console.log("Sin icono:", sinIcon);
console.log("Sin banner:", sinBanner);
console.log("Con overrides aplicados:", conOverrides);
console.log("Por rareza:", porRareza);
console.log(
    "Campos opcionales presentes -> sources:",
    conSources,
    "| obtainable:",
    conObtainable,
    "| note:",
    conNote,
);

await mkdir(OUT_DIR, { recursive: true });
await writeFile(`${OUT_DIR}/emblems.json`, JSON.stringify(emblems, null, 2));
console.log(`Guardado en ${OUT_DIR}/emblems.json`);
