import React, { useEffect, useState } from "react";

function SummaryPage() {
  const [task1Data, setTask1Data] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("task1Results");
    if (storedResults) {
      setTask1Data(JSON.parse(storedResults));
    }
  }, []);

  return (
    <div className="summary-container">
      <h1>📋 Experiment Complete!</h1>
      <p>Thank you for participating in the experiment.</p>

      {task1Data && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🧠 Task 1: Pattern Matching</h3>
          <p>⏱️ Total Time: <strong>{task1Data.time}</strong></p>
          <p>
            🎯 Accuracy: You guessed <strong>{task1Data.correct}</strong> out of{" "}
            <strong>{task1Data.total}</strong> pattern cells correctly.
          </p>
          <p>📊 Final Accuracy: <strong>{task1Data.accuracy}%</strong></p>
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
