// src/components/Task3.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Task3.css";

const mathLevels = {
  1: { question: "8 + 7 - 5 = ?", options: [9, 10, 11, 12], correct: 10 },
  2: { question: "15 ÷ 3 + 2 = ?", options: [6, 7, 8, 9], correct: 7 },
  3: { question: "2² + 5 = ?", options: [8, 9, 10, 11], correct: 9 },
  4: { question: "6 × (2 + 3) = ?", options: [24, 28, 30, 36], correct: 30 },
  5: { question: "√49 + 3 = ?", options: [8, 9, 10, 11], correct: 10 },
  6: { question: "5² - 4² = ?", options: [9, 11, 13, 15], correct: 9 },
  7: { question: "18 ÷ (3 + 3) = ?", options: [2, 3, 4, 5], correct: 3 },
  8: { question: "7 + (6 × 2) = ?", options: [17, 18, 19, 20], correct: 19 },
  9: { question: "(15 + 5) ÷ 4 = ?", options: [4, 5, 6, 7], correct: 5 },
  10: { question: "√(81) ÷ 3 = ?", options: [2, 3, 4, 5], correct: 3 },
  11: { question: "8² ÷ 16 = ?", options: [2, 3, 4, 5], correct: 4 },
  12: { question: "(9 × 2) - 7 = ?", options: [10, 11, 12, 13], correct: 11 },
  13: { question: "(5 + 8) × 2 = ?", options: [24, 25, 26, 27], correct: 26 },
  14: { question: "√(100) + 12 = ?", options: [20, 21, 22, 23], correct: 22 },
  15: { question: "36 ÷ 6 + 7 = ?", options: [11, 12, 13, 14], correct: 13 },
  16: { question: "7² ÷ 7 = ?", options: [5, 6, 7, 8], correct: 7 },
  17: { question: "3³ ÷ 3 = ?", options: [7, 8, 9, 10], correct: 9 },
  18: { question: "6 × (4 + 2) = ?", options: [30, 32, 34, 36], correct: 36 },
  19: { question: "(15 ÷ 3) + (8 ÷ 2) = ?", options: [8, 9, 10, 11], correct: 9 },
  20: { question: "√(144) ÷ 2 = ?", options: [5, 6, 7, 8], correct: 6 },
  21: { question: "x = 5. Find 2x + 3.", options: [11, 12, 13, 14], correct: 13 },
  22: { question: "√(25) + √(16) = ?", options: [8, 9, 10, 11], correct: 9 },
  23: { question: "20% of 50 = ?", options: [8, 9, 10, 11], correct: 10 },
  24: { question: "Average of 8, 10, 12?", options: [9, 10, 11, 12], correct: 10 },
  25: { question: "Solve: (6² ÷ 4) + 2", options: [10, 11, 12, 13], correct: 11 },
  26: { question: "(9 + 6) × 2 ÷ 5 = ?", options: [5, 6, 7, 8], correct: 6 },
  27: { question: "(3³ + 1) ÷ 4 = ?", options: [7, 8, 9, 10], correct: 7 },
  28: { question: "x = 9. What is (x × 2) - 5?", options: [11, 12, 13, 14], correct: 13 },
  29: { question: "Solve: (5 × 6) ÷ (2 + 1)", options: [9, 10, 11, 12], correct: 10 },
  30: { question: "(8² - 4²) ÷ 6 = ?", options: [8, 12, 14, 16], correct: 8 },
};


const Task3 = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [taskElapsedTime, setTaskElapsedTime] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!taskCompleted) {
      // 🛠 Reset DND properly
      localStorage.removeItem("dndActivated");
      localStorage.removeItem("dndActiveForThisTask");

      const startEvent = new CustomEvent("taskStatus", { detail: "start" });
      window.dispatchEvent(startEvent);

      const start = Date.now();
      setStartTime(start);

      intervalRef.current = setInterval(() => {
        setTaskElapsedTime(Date.now() - start);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [taskCompleted]);
  

  useEffect(() => {
    const hintLevels = [5, 12, 20];
    if (hintLevels.includes(currentLevel)) {
      const event = new CustomEvent("triggerHint", { detail: currentLevel });
      window.dispatchEvent(event);
    }
  }, [currentLevel]);

  const handleAnswer = (selected) => {
    const q = mathLevels[currentLevel];
    const correct = selected === q.correct;

    setAnswers((prev) => [...prev, { level: currentLevel, selected, correct }]);

    if (currentLevel < Object.keys(mathLevels).length) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      clearInterval(intervalRef.current);
      const totalCorrect = answers.filter((a) => a.correct).length + (correct ? 1 : 0);
      const accuracyPercent = ((totalCorrect / Object.keys(mathLevels).length) * 100).toFixed(1);
      const formattedTime = formatTime(Date.now() - startTime);

      localStorage.setItem(
        "task3Results",
        JSON.stringify({
          time: formattedTime,
          correct: totalCorrect,
          total: Object.keys(mathLevels).length,
          accuracy: accuracyPercent,
        })
      );

      setTaskCompleted(true);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const question = mathLevels[currentLevel];

  // 🛑 Handle DND button press
  const handleDND = () => {
    localStorage.setItem("dndActiveForThisTask", "true");
    localStorage.setItem("dndWasPressed", "true");        // ✅ global
    localStorage.setItem("dndTaskPressed", "Task 3");      // ✅ this task's name
    
    const event = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(event);
  };
  

  if (taskCompleted) {
    const endEvent = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(endEvent);

    const totalCorrect = answers.filter((a) => a.correct).length;
    const accuracyPercent = ((totalCorrect / Object.keys(mathLevels).length) * 100).toFixed(1);
    const formattedTime = formatTime(taskElapsedTime);

    return (
      <div className="task3-container">
        <h2>🎉 Task 3 Complete!</h2>
        <p>You've completed all {Object.keys(mathLevels).length} math questions!</p>
        <p>Total Task Time: {formattedTime}</p>
        <p>You answered {totalCorrect} out of {Object.keys(mathLevels).length} questions correctly.</p>
        <p>Accuracy: <strong>{accuracyPercent}%</strong></p>
        <button onClick={() => navigate("/task4-instructions")}>Next Task</button>
      </div>
    );
  }

  return (
    <div className="task3-container">
      {/* ⏱️ Task timer */}
      <p
        style={{
          position: "fixed",
          top: "40px",
          right: "20px",
          background: "#fff",
          padding: "4px 8px",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        ⏱ Time: {formatTime(taskElapsedTime)}
      </p>

      {/* 🛑 DND BUTTON only if not already activated */}
      {!localStorage.getItem("dndWasPressed") && (
        <button
          onClick={handleDND}
          style={{
            position: "fixed",
            top: "85px",
            right: "20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 12px",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          🛑 Do Not Disturb
        </button>
      )}

      <h2>🧮 Level {currentLevel}</h2>
      <p>{question?.question}</p>
      <div className="options">
        {question?.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Task3;
