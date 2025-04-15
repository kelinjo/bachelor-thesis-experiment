import React, { useEffect, useState } from "react";

function SummaryPage() {
  const [task1Data, setTask1Data] = useState(null);
  const [task2Data, setTask2Data] = useState(null);

  useEffect(() => {
    const storedTask1 = localStorage.getItem("task1Results");
    const storedTask2 = localStorage.getItem("task2Results");

    if (storedTask1) {
      setTask1Data(JSON.parse(storedTask1));
    }

    if (storedTask2) {
      setTask2Data(JSON.parse(storedTask2));
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

      {task2Data && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🗼 Task 2: Tower of Hanoi</h3>
          <p>⏱️ Total Time: <strong>{task2Data.time}</strong></p>
          <p>📦 Total Moves Made: <strong>{task2Data.moves}</strong></p>
          <p>📈 Efficiency: <strong>{task2Data.efficiency}%</strong></p>
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
