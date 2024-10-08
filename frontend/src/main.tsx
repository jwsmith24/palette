import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import RubricBuilder from "./components/RubricBuilder";
import Home from "./components/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
