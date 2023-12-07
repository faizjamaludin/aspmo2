import React from "react";
import { Dashboard, Projects, ProjectTask } from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/task/:projectId" element={<ProjectTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
