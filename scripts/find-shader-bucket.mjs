// scripts/find-shader-bucket.mjs
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(".cache/world-es.sqlite", { readOnly: true });

console.log("=== BUCKETS ===");
const buckets = db
    .prepare("SELECT json FROM DestinyInventoryBucketDefinition")
    .all();
for (const row of buckets) {
    const b = JSON.parse(String(row.json));
    console.log(b.bucketHash, "|", b.bucketName, "|", b.bucketIdentifier);
}

console.log("\n=== TIPOS DE ÍTEM ===");
const counts = new Map();
const items = db
    .prepare("SELECT json FROM DestinyInventoryItemDefinition")
    .all();
for (const row of items) {
    const item = JSON.parse(String(row.json));
    const type = item.itemTypeName ?? "(sin tipo)";
    counts.set(type, (counts.get(type) ?? 0) + 1);
}
for (const [type, total] of [...counts].sort((a, b) => b[1] - a[1])) {
    console.log(`${type}: ${total}`);
}
