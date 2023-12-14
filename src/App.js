import React from "react";
import {
  Dashboard,
  Projects,
  ProjectTask,
  TesPage,
  Claims,
  ClaimTask,
  CostTracking,
  CostTrackingItem,
} from "./pages";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/task/:projectId" element={<ProjectTask />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claim/task/:projectId" element={<ClaimTask />} />
        <Route path="/claim/task/:projectId" element={<ClaimTask />} />
        <Route path="/costtracking" element={<CostTracking />} />
        <Route
          path="/costtracking/list/:projectId"
          element={<CostTrackingItem />}
        />
        <Route path="/test" element={<TesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
