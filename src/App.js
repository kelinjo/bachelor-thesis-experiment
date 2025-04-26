import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Task1Instructions from "./components/Task1Instructions";
import Task1 from "./components/Task1";
import Task2Instructions from "./components/Task2Instructions";
import Task2 from "./components/Task2";
import Task3Instructions from "./components/Task3Instructions"; // ✅ important
import Task3 from "./components/Task3"; // ✅ important
import SummaryPage from "./components/SummaryPage";
import GlobalTimer from "./components/GlobalTimer";
import NotificationSystem from "./components/NotificationSystem";

function App() {
  return (
    <Router>
      <GlobalTimer />
      <NotificationSystem />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/task1-instructions" element={<Task1Instructions />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2-instructions" element={<Task2Instructions />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task3-instructions" element={<Task3Instructions />} /> {/* ✅ */}
        <Route path="/task3" element={<Task3 />} /> {/* ✅ */}
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
