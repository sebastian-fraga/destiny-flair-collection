import { Analytics } from "@vercel/analytics/next";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import DestinyCursor from "./components/DestinyCursor.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <DestinyCursor />
        <Analytics />
    </StrictMode>,
);
