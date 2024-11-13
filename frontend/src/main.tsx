/*
Entry point for the entire application.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "@features/home/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RubricBuilder from "@features/rubricBuilder/RubricBuilder";
import NotFoundPage from "./components/NotFoundPage";
import UserRubrics from "@features/user/UserRubrics";
import UserClusters from "@features/user/UserClusters";
import GradingView from "@features/grading/GradingView.tsx";
import { CourseProvider } from "./context/CourseProvider";
import { AssignmentProvider } from "./context/AssignmentProvider.tsx";

// Defined a "root" div in index.html that we pull in here and then call the React render method.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*Provides the course context for consistent active course state across the application*/}
    <CourseProvider>
      {/* Router and Routes are the mechanism for client-side routing */}
      <AssignmentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rubric-builder" element={<RubricBuilder />} />
            <Route path="/rubrics" element={<UserRubrics />} />
            <Route path="/clusters" element={<UserClusters />} />
            <Route path="/grading" element={<GradingView />} />
            {/*Any route that doesn't match the routes defined above will go to the 404 page*/}
            <Route path={"*"} element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AssignmentProvider>
    </CourseProvider>
  </StrictMode>,
);
