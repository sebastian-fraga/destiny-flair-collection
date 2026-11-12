// scripts/inspect-db.mjs
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(".cache/world-es.sqlite", { readOnly: true });

// sqlite_master es la tabla interna que lista todas las tablas de la base
const tables = db
    .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name",
    )
    .all();

console.log("Cantidad de tablas:", tables.length);

for (const { name } of tables) {
    const { total } = db
        .prepare(`SELECT COUNT(*) AS total FROM "${name}"`)
        .get();
    console.log(`- ${name}: ${total} filas`);
}

// Miramos la estructura de la tabla de ítems
const columns = db
    .prepare("PRAGMA table_info(DestinyInventoryItemDefinition)")
    .all();
console.log("\nColumnas de DestinyInventoryItemDefinition:");
console.log(columns.map((c) => `${c.name} (${c.type})`));

// Y una fila de ejemplo, para ver cómo luce el JSON
const row = db
    .prepare("SELECT * FROM DestinyInventoryItemDefinition LIMIT 1")
    .get();
console.log("\nEjemplo de fila (recortado):");
console.log(String(row.json).slice(0, 500));
