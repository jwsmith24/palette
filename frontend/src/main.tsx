import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./components/views/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RubricBuilder from "./components/views/RubricBuilder.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rubric-builder" element={<RubricBuilder />} />
        </Routes>
      </div>
    </Router>
  </StrictMode>,
);
