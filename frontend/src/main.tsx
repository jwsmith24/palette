import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import RubricBuilder from "./components/RubricBuilder";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RubricBuilder />
  </StrictMode>,
);
