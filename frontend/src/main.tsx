/*
Entry point for the entire application.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./components/views/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RubricBuilder from "./components/views/RubricBuilder.tsx";

// Defined a "root" div in index.html that we pull in here and then call the React render method.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router and Routes are the mechanism for client-side routing */}
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
