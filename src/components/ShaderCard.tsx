import ItemCard from "./collectible/ItemCard.tsx";
import ItemTooltipContent from "./collectible/ItemTooltipContent.tsx";
import type { Shader } from "../types/shader.ts";

interface Props {
    shader: Shader;
}

function renderShaderTooltip(item: Shader) {
    return <ItemTooltipContent item={item} typeLabel="Shader" />;
}

export default function ShaderCard({ shader }: Props) {
    return (
        <ItemCard item={shader} renderTooltip={renderShaderTooltip} />
    );
}
