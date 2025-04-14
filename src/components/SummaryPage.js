import React, { useEffect } from "react";

function SummaryPage() {
  useEffect(() => {
    const start = parseInt(localStorage.getItem("experimentStart"));
    const now = Date.now();
    const totalTime = now - start;
    console.log("Total experiment duration (ms):", totalTime);
  }, []); // Don't forget the empty array to run only once!

  return (
    <div className="summary-container">
      <h1>📊 Experiment Summary</h1>
      <p>The experiment has ended. Thank you for participating!</p>
    </div>
  );
}

export default SummaryPage;
