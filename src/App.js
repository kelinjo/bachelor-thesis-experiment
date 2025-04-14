import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Task1Instructions from "./components/Task1Instructions";
import Task1 from "./components/Task1";
import SummaryPage from "./components/SummaryPage"; // ✅ Import this
import GlobalTimer from "./components/GlobalTimer";


function App() {
  return (
    <Router>
      <GlobalTimer /> {/* ✅ Always visible */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/task1-instructions" element={<Task1Instructions />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/summary" element={<SummaryPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
