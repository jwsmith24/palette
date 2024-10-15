/*
Entry point for the entire application.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./components/home/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RubricBuilder from "./components/rubric-builder/RubricBuilder.tsx";
import NotFoundPage from "./components/util/NotFoundPage.tsx";

// Defined a "root" div in index.html that we pull in here and then call the React render method.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router and Routes are the mechanism for client-side routing */}
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rubric-builder" element={<RubricBuilder />} />
          {/*Any route that doesn't match the routes defined above will go to the 404 page*/}
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  </StrictMode>,
);