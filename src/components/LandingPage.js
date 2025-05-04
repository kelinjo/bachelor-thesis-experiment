import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🧹 Full reset on landing page
    localStorage.removeItem("experimentStart");
    localStorage.removeItem("group");
    localStorage.removeItem("notificationLog");
    localStorage.removeItem("dndTaskPressed");
    localStorage.removeItem("dndWasPressed"); 
    localStorage.removeItem("dndActiveForThisTask");
    localStorage.removeItem("task1Results");
    localStorage.removeItem("task2Results");
    localStorage.removeItem("task3Results");
    localStorage.removeItem("task4Results");
    localStorage.removeItem("currentLevel"); 
  }, []);
  

  useEffect(() => {
    // ✅ Reset the timer on landing
    localStorage.removeItem("experimentStart");
  }, []);

  const handleGroupSelect = (group) => {
    localStorage.setItem("group", group);
    localStorage.setItem("experimentStart", Date.now());
  
    // ✅ Clear previous logs
    localStorage.removeItem("notificationLog");
  
    navigate("/task1-instructions");
  };
  

  return (
    <div className="container">
      <h1>The Psychology of Notifications</h1>
      <p>
            Welcome to the experiment <strong>"The Psychology of Notifications"</strong>.
            You’ll complete a series of simple yet mentally engaging tasks designed to measure <strong>focus</strong>,
            <strong> attention</strong>, and <strong>problem-solving</strong> under varying conditions.
          </p>

          <p>
            Throughout the experiment, you'll receive notifications at different intervals depending on the group you’re assigned to.
            These notifications may include <strong>distractions</strong> or even <strong>helpful hints</strong> but you won’t know which until you engage with them. What that means is that 
            when you click the notification they expand an show a <strong>hidden message</strong>.
            The notifications will <strong>dissapear</strong> after <strong>6 seconds</strong> seconds of <strong>no interaction</strong>, so keep that in mind when interacting with hints.
          </p>

          <p>
            At any time during the experiment, you will have the option to activate <strong>Do Not Disturb (DND)</strong> mode.
            Pressing the <strong>🛑 Do Not Disturb</strong> button will immediately stop new notifications from appearing for the rest of the current task and
            the notifications will continue at the next task.
            You can use this option if you find the interruptions too distracting — but it will be recorded and make sure to use it wisely since it can olny be used <strong>1</strong> time!
          </p>


          <p>
            Your <strong>accuracy</strong>, <strong>speed</strong> and <strong>interactions</strong> with notifications and DND will be recorded for analysis.
            The entire experiment takes approximately <strong>15-20 minutes</strong> to complete.
          </p>

          <p className="warning">
            ⚠️<strong>
              Once you choose your group below, the global experiment timer will begin. Going back (pressing the back button on the browser) at any point of the experiment is forbidden so read the task instructions carefully!!!
            </strong>
            <br />
              Make sure you're ready, focused and free from interruptions.
            <br />
              🎧 For best results, please complete the experiment with headphones, also keep the volume at least 50%, preferably a bit higher.
          </p>


        <div className="button-group" style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", marginTop: "1rem" }}>
  <button
        onClick={() => handleGroupSelect("A")}
        style={{
          backgroundColor: "#b6e2a1",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#9ad17d")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#b6e2a1")}
      >
        📗 Group A – Low Distraction (Fewest notifications)
      </button>

      <button
        onClick={() => handleGroupSelect("B")}
        style={{
          backgroundColor: "#a1c9e2",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#7bb4d6")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#a1c9e2")}
      >
        📘 Group B – Moderate Distraction
      </button>

      <button
        onClick={() => handleGroupSelect("C")}
        style={{
          backgroundColor: "#f3c493",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#f0ad67")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#f3c493")}
      >
        📙 Group C – High Distraction (Most notifications)
      </button>
    </div>


    </div>
  );
}

export default LandingPage;
