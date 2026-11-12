// scripts/download-manifest.mjs
import AdmZip from "adm-zip";
import { mkdir, writeFile, access } from "node:fs/promises";

const API_KEY = process.env.BUNGIE_API_KEY;
const LANG = "es";
const CACHE_DIR = ".cache";

if (!API_KEY) {
    console.error("Falta BUNGIE_API_KEY en las variables de entorno");
    process.exit(1);
}

// 1. Pedir el manifest para saber la ruta actual del archivo
const manifestRes = await fetch(
    "https://www.bungie.net/d1/Platform/Destiny/Manifest/",
    {
        headers: { "X-API-Key": API_KEY },
    },
);
const manifest = (await manifestRes.json()).Response;
const path = manifest.mobileWorldContentPaths[LANG];

// 2. Nombre del archivo local basado en la ruta (cambia cuando Bungie actualiza)
const fileName = path.split("/").pop(); // world_sql_content_af72...content
const zipPath = `${CACHE_DIR}/${fileName}`;
const dbPath = `${CACHE_DIR}/world-${LANG}.sqlite`;

await mkdir(CACHE_DIR, { recursive: true });

// 3. Si ya lo descargamos antes, no lo repetimos
const exists = await access(zipPath)
    .then(() => true)
    .catch(() => false);

if (exists) {
    console.log("Ya descargado:", fileName);
} else {
    console.log("Descargando", fileName, "...");
    const fileRes = await fetch(`https://www.bungie.net${path}`);
    if (!fileRes.ok) {
        console.error("Falló la descarga:", fileRes.status);
        process.exit(1);
    }
    await writeFile(zipPath, Buffer.from(await fileRes.arrayBuffer()));
}

// 4. Descomprimir: el zip contiene un único archivo (la base SQLite)
const zip = new AdmZip(zipPath);
const entries = zip.getEntries();
console.log(
    "Archivos dentro del zip:",
    entries.map((e) => e.entryName),
);

await writeFile(dbPath, entries[0].getData());
console.log("Base SQLite guardada en:", dbPath);
