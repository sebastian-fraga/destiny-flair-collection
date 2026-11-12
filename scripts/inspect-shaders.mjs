// scripts/inspect-shaders.mjs
import { readFile } from "node:fs/promises";

const shaders = JSON.parse(await readFile("src/data/shaders.json", "utf8"));

function show(title, list) {
    console.log(`\n=== ${title} (${list.length}) ===`);
    for (const s of list) {
        console.log(
            `${s.hash} | ${s.name} | tier: ${s.tier} | hasIcon: ${s.hasIcon} | icon: ${s.icon}`,
        );
        if (s.description) console.log(`   desc: ${s.description}`);
    }
}

show(
    "SIN ÍCONO",
    shaders.filter((s) => !s.hasIcon),
);
show(
    "SIN RAREZA",
    shaders.filter((s) => !s.tier),
);
show(
    "RAREZA COMÚN",
    shaders.filter((s) => s.tier === "Común"),
);

const porNombre = new Map();
for (const s of shaders) {
    porNombre.set(s.name, [...(porNombre.get(s.name) ?? []), s]);
}
const repetidos = [...porNombre.values()].filter((list) => list.length > 1);
show("NOMBRES REPETIDOS", repetidos.flat());
