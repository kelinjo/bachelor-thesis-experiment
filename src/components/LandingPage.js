import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Reset the timer on landing
    localStorage.removeItem("experimentStart");
  }, []);

  const handleGroupSelect = (group) => {
    localStorage.setItem("group", group);
    localStorage.setItem("experimentStart", Date.now());
    navigate("/task1-instructions");
  };

  return (
    <div className="container">
      <h1>The Psychology of Notifications</h1>
      <p>
            Welcome to the experiment <strong>"The Psychology of Notifications"</strong>.
            You’ll complete a series of simple yet mentally engaging tasks designed to measure focus,
            attention, and problem-solving under varying conditions.
          </p>

          <p>
            Throughout the experiment, you'll receive notifications at different intervals depending on the group you’re assigned to.
            These notifications may include distractions—or even helpful hints—but you won’t know which until you engage with them.
          </p>

          <p>
            Your performance, speed, and interaction with notifications will be recorded for analysis.
            The entire experiment takes approximately <strong>25–30 minutes</strong> to complete.
          </p>

          <p className="warning">
            ⚠️ <strong>Once you choose your group below, the global experiment timer will begin.</strong><br />
            Make sure you're ready and free from interruptions.
        </p>

        <div className="button-group" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginTop: "1rem" }}>
          <button onClick={() => handleGroupSelect("A")}>
            📗 Group A – Low Distraction (Fewest notifications)
          </button>
          <button onClick={() => handleGroupSelect("B")}>
            📘 Group B – Moderate Distraction
          </button>
          <button onClick={() => handleGroupSelect("C")}>
            📙 Group C – High Distraction (Most notifications)
          </button>
        </div>

    </div>
  );
}

export default LandingPage;
