import shadersData from "./data/shaders.json";
import ShaderCard from "./components/ShaderCard";
import type { Shader } from "./types/shader.ts";
import "./styles/App.css";

const shaders = shadersData as Shader[];

export default function App() {
    return (
        <main>
            <header>
                <h1>Destiny Shader Collection</h1>
                <p>{shaders.length} shaders de Destiny 1</p>
            </header>
            <ul className="grid grid-cols-6 gap-y-3 gap-x-2">
                {shaders.map((shader) => (
                    <ShaderCard key={shader.hash} shader={shader} />
                ))}
            </ul>
        </main>
    );
}
