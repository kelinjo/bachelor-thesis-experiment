import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Task1Instructions from "./components/Task1Instructions";
import Task1 from "./components/Task1";
import Task2Instructions from "./components/Task2Instructions";
import Task2 from "./components/Task2"; // (we'll create this next)
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
        <Route path="/task2-instructions" element={<Task2Instructions />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/summary" element={<SummaryPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
