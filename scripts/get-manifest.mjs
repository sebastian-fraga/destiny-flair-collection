const API_KEY = process.env.BUNGIE_API_KEY;

if (!API_KEY) {
    console.error(
        "No se encontró la BUNGIE_API_KEY en las variables del entorno",
    );
    process.exit(1);
}

const res = await fetch(
    "https://www.bungie.net/d1/Platform/Destiny/Manifest/",
    {
        headers: { "X-API-Key": API_KEY },
    },
);

if (!res.ok) {
    console.error("HTTP", res.status, res.statusText);
    process.exit(1);
}

const data = await res.json();

console.log("ErrorCode:", data.ErrorCode, "-", data.ErrorStatus);
console.log("Version:", data.Response?.version);
console.log(
    "Idiomas disponibles:",
    Object.keys(data.Response?.mobileWorldContentPaths ?? {}),
);
console.log("Ruta en español:", data.Response?.mobileWorldContentPaths?.es);