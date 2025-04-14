import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 Add this

function GlobalTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const location = useLocation(); // 👈 Get the current route path

  useEffect(() => {
    const startTime = localStorage.getItem("experimentStart");
    if (!startTime) return;

    const updateElapsed = () => {
      const now = Date.now();
      const diff = now - parseInt(startTime);

      // ✅ Stop timer update if user is on summary page
      if (location.pathname === "/summary") {
        clearInterval(interval); // stop the interval
        return;
      }

      setElapsedTime(diff);
    };

    const interval = setInterval(updateElapsed, 1000);
    updateElapsed(); // Update once immediately

    return () => clearInterval(interval); // Cleanup when unmounted
  }, [location.pathname]); // 🔁 Re-run effect if route changes

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div style={styles.timer}>
      ⏱️ {formatTime(elapsedTime)}
    </div>
  );
}

const styles = {
  timer: {
    position: "fixed",
    top: 10,
    right: 20,
    backgroundColor: "#f0f0f0",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "16px",
    zIndex: 1000,
  },
};

export default GlobalTimer;
