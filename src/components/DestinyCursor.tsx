import { useEffect } from "react";

export default function DestinyCursor() {
    useEffect(() => {
        const cursor = document.querySelector("#destiny-cursor");

        const handleMouseMove = (event: MouseEvent) => {
            if (!(cursor instanceof HTMLElement)) return;

            cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            id="destiny-cursor"
            className="pointer-events-none fixed left-0 top-0 z-50 size-13 rounded-full backdrop-brightness-80 bg-black/10 shadow-[0_0_10px_4px_#ffffffcc,0_0_30px_12px_#ffffff55]"
        />
    );
}
