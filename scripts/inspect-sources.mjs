import { DatabaseSync } from "node:sqlite";

const SHADER_BUCKET = 2973005342;
const db = new DatabaseSync(".cache/world-es.sqlite", { readOnly: true });

const parse = (row) => JSON.parse(String(row.json));

const shaders = db
    .prepare("SELECT json FROM DestinyInventoryItemDefinition")
    .all()
    .map(parse)
    .filter(
        (i) =>
            i.bucketTypeHash === SHADER_BUCKET && i.hasIcon && i.tierTypeName,
    );

console.log("=== CAMPOS DE UN SHADER ===");
console.log(Object.keys(shaders[1]));
console.log(JSON.stringify(shaders[1], null, 2).slice(0, 1500));

const conSource = shaders.filter((s) => s.sourceHashes?.length > 0);
console.log(
    `\n=== sourceHashes: ${conSource.length} de ${shaders.length} shaders ===`,
);

console.log("\n=== DestinyRewardSourceDefinition (primeras 5) ===");
const sources = db
    .prepare("SELECT json FROM DestinyRewardSourceDefinition")
    .all()
    .map(parse);
for (const src of sources.slice(0, 5)) {
    console.log(JSON.stringify(src).slice(0, 300));
}

const vendors = db
    .prepare("SELECT json FROM DestinyVendorDefinition")
    .all()
    .map(parse);
const vendorTexts = vendors.map((v) => ({ v, text: JSON.stringify(v) }));

let enVendor = 0;
for (const s of shaders) {
    if (
        vendorTexts.some(({ text }) =>
            text.includes(`"itemHash":${s.itemHash}`),
        )
    ) {
        enVendor++;
    }
}
console.log(
    `\n=== Shaders que aparecen en algún vendor: ${enVendor} de ${shaders.length} ===`,
);
console.log("Campos de un vendor:", Object.keys(vendors[0]));
