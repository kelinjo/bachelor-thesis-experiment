// src/components/SummaryPage.js
import React, { useEffect, useState } from "react";

function SummaryPage() {
  const [task1Data, setTask1Data] = useState(null);
  const [task2Data, setTask2Data] = useState(null);
  const [task3Data, setTask3Data] = useState(null);
  const [task4Data, setTask4Data] = useState(null); // ✅ NEW
  const [experimentDuration, setExperimentDuration] = useState(null);
  const [group, setGroup] = useState(null);
  const [notificationLog, setNotificationLog] = useState([]);

  useEffect(() => {
    const storedTask1 = localStorage.getItem("task1Results");
    const storedTask2 = localStorage.getItem("task2Results");
    const storedTask3 = localStorage.getItem("task3Results");
    const storedTask4 = localStorage.getItem("task4Results"); // ✅ Fetch task4 results
    const start = localStorage.getItem("experimentStart");
    const groupValue = localStorage.getItem("group");
    const log = localStorage.getItem("notificationLog");

    if (storedTask1) setTask1Data(JSON.parse(storedTask1));
    if (storedTask2) setTask2Data(JSON.parse(storedTask2));
    if (storedTask3) setTask3Data(JSON.parse(storedTask3));
    if (storedTask4) setTask4Data(JSON.parse(storedTask4)); // ✅ Save task4Data
    if (groupValue) setGroup(groupValue);
    if (log) setNotificationLog(JSON.parse(log));

    if (start) {
      const now = Date.now();
      const durationMs = now - parseInt(start);
      const formatted = `${Math.floor(durationMs / 60000)}m ${Math.floor(
        (durationMs % 60000) / 1000
      )}s`;
      setExperimentDuration(formatted);
    }
  }, []);

  const downloadCSV = () => {
    const results = [
      [
        "Group",
        "Experiment Duration",
        "Task1 Time",
        "Task1 Accuracy (%)",
        "Task1 Correct/Total",
        "Task2 Time",
        "Task2 Moves",
        "Task2 Efficiency (%)",
        "Task3 Time",
        "Task3 Accuracy (%)",
        "Task3 Correct/Total",
        "Task4 Time",
      ],
      [
        group || "N/A",
        experimentDuration || "N/A",
        task1Data?.time || "N/A",
        task1Data?.accuracy || "N/A",
        task1Data ? `"'${task1Data.correct}/${task1Data.total}'"` : "N/A",
        task2Data?.time || "N/A",
        task2Data?.moves || "N/A",
        task2Data?.efficiency || "N/A",
        task3Data?.time || "N/A",
        task3Data?.accuracy || "N/A",
        task3Data ? `"'${task3Data.correct}/${task3Data.total}'"` : "N/A",
        task4Data?.time || "N/A", // ✅ Added Task 4 time
      ],
      [],
      ["Notification Log:"],
      ["ID", "Type", "Timestamp", "Clicked", "Click Time", "Content"],
      ...notificationLog.map((n) => [
        n.id,
        n.type,
        n.timestamp,
        n.wasClicked ? "Yes" : "No",
        n.clickTime || "",
        (n.content || "").replace(/\n/g, " ").replace(/,/g, ";"),
      ]),
    ];

    const csvContent = results.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "experiment_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="summary-container">
      <h1>📋 Experiment Complete!</h1>
      <p>Thank you for participating in the experiment.</p>

      {group && <p><strong>Group:</strong> {group}</p>}
      {experimentDuration && (
        <p><strong>Total Experiment Duration:</strong> {experimentDuration}</p>
      )}

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

      {task3Data && (
        <div style={{ marginTop: "2rem" }}>
          <h3>➕ Task 3: Quick Math</h3>
          <p>⏱️ Total Time: <strong>{task3Data.time}</strong></p>
          <p>
            🎯 Correct Answers: <strong>{task3Data.correct}</strong> out of{" "}
            <strong>{task3Data.total}</strong>
          </p>
          <p>📊 Final Accuracy: <strong>{task3Data.accuracy}%</strong></p>
        </div>
      )}

      {task4Data && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🧐 Task 4: Odd-One-Out</h3>
          <p>⏱️ Total Time: <strong>{task4Data.time}</strong></p>
        </div>
      )}

      <button
        onClick={downloadCSV}
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
        }}
      >
        📤 Export Results (CSV)
      </button>
    </div>
  );
}

export default SummaryPage;
