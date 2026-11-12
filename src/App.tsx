import shaders from "./data/shaders.json";
import "./App.css";

const BUNGIE = "https://www.bungie.net";

function availabilityLabel(obtainable: boolean | null) {
    if (obtainable === true) return "Conseguible";
    if (obtainable === false) return "No conseguible";
    return "Sin revisar";
}

export default function App() {
    return (
        <main>
            <header>
                <h1>Destiny Shader Collection</h1>
                <p>{shaders.length} shaders de Destiny 1</p>
            </header>

            <ul className="grid">
                {shaders.map((shader) => (
                    <li
                        key={shader.hash}
                        className="card"
                        data-tier={shader.tier}
                        title={shader.description}
                    >
                        <img
                            src={`${BUNGIE}${shader.icon}`}
                            alt={shader.name}
                            width={64}
                            height={64}
                            loading="lazy"
                        />
                        <span className="name">{shader.name}</span>
                        <span className="tier">{shader.tier}</span>
                        <span className="source">
                            {shader.sources.length > 0
                                ? shader.sources.join(" · ")
                                : "Sin dato"}
                        </span>
                        <span
                            className="availability"
                            data-obtainable={String(shader.obtainable)}
                        >
                            {availabilityLabel(shader.obtainable)}
                        </span>
                        {shader.note && (
                            <span className="note">{shader.note}</span>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}
