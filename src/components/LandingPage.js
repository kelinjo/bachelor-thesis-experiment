import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGroupSelect = (group) => {
    localStorage.setItem("group", group); // Save group for later
    navigate("/task1-instructions");
  };

  return (
    <div className="container">
      <h1>The Psychology of Notifications</h1>
      <p>
        Welcome! In this experiment, you will complete several simple tasks. Based on your assigned group,
        you will receive notifications at different intervals.
      </p>
      <p className="warning">
        ⚠️ Once you choose your group, the timer for the experiment will begin!
      </p>
      <div className="button-group">
        <button onClick={() => handleGroupSelect("A")}>Group A</button>
        <button onClick={() => handleGroupSelect("B")}>Group B</button>
        <button onClick={() => handleGroupSelect("C")}>Group C</button>
      </div>
    </div>
  );
}

export default LandingPage;
