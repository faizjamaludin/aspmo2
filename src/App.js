import React from "react";
import { Dashboard, Projects, ProjectTask, TesPage } from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/task/:projectId" element={<ProjectTask />} />
        <Route path="/test" element={<TesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
