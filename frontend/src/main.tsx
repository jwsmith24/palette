/*
Entry point for the entire application.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./features/home/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RubricBuilder from "./features/rubricBuilder/RubricBuilder.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";
import UserRubrics from "./features/user/UserRubrics.tsx";
import UserClusters from "./features/user/UserClusters.tsx";

// Defined a "root" div in index.html that we pull in here and then call the React render method.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router and Routes are the mechanism for client-side routing */}
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rubric-builder" element={<RubricBuilder />} />
          <Route path="/rubrics" element={<UserRubrics />} />
          <Route path="/clusters" element={<UserClusters />} />
          {/*Any route that doesn't match the routes defined above will go to the 404 page*/}
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  </StrictMode>,
);
