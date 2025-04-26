// src/components/Task3.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Task3.css";

const mathLevels = {
  1: { question: "2 + 2 = ?", options: [3, 4, 5, 6], correct: 4 },
  2: { question: "10 - 3 = ?", options: [6, 7, 8, 9], correct: 7 },
  3: { question: "3 × 4 = ?", options: [7, 12, 11, 14], correct: 12 },
  4: { question: "16 ÷ 2 = ?", options: [6, 7, 8, 9], correct: 8 },
  5: { question: "√49 = ?", options: [5, 6, 7, 8], correct: 7 },
  6: { question: "12 + 4 × 2 = ?", options: [20, 18, 16, 22], correct: 20 },
  7: { question: "15 ÷ (3 × 1) = ?", options: [3, 5, 6, 7], correct: 5 },
  8: { question: "x + 4 = 10. Solve x.", options: [5, 6, 7, 8], correct: 6 },
  9: { question: "√(64) ÷ 2 = ?", options: [2, 4, 6, 8], correct: 4 },
  10: { question: "(5 × 2) + 3 = ?", options: [13, 11, 12, 10], correct: 13 },
  11: { question: "9 + 6 ÷ 3 = ?", options: [11, 13, 15, 17], correct: 11 },
  12: { question: "3² + √16 = ?", options: [11, 12, 13, 14], correct: 13 },
  13: { question: "Solve: x/2 = 6", options: [10, 12, 13, 14], correct: 12 },
  14: { question: "Simplify: (3 + 5) × 2", options: [14, 15, 16, 17], correct: 16 },
  15: { question: "Solve: x - 3 = 4", options: [5, 6, 7, 8], correct: 7 },
  16: { question: "What is 1/2 of 36?", options: [16, 17, 18, 19], correct: 18 },
  17: { question: "x = 10. What is x²?", options: [100, 90, 80, 70], correct: 100 },
  18: { question: "Solve: 2(x + 3) = 14", options: [5, 6, 7, 8], correct: 4 },
  19: { question: "What is the average of 10, 15, and 25?", options: [15, 16.6, 18, 20], correct: 16.6 },
  20: { question: "Solve: (√81 + 5) × 2", options: [26, 28, 30, 32], correct: 28 },
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
      const startEvent = new CustomEvent("taskStatus", { detail: "start" });
      window.dispatchEvent(startEvent);
    }
  }, [taskCompleted]);
  

  useEffect(() => {
    setStartTime(Date.now());
    intervalRef.current = setInterval(() => {
      setTaskElapsedTime(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const hintLevels = [3, 12, 20];
    if (hintLevels.includes(currentLevel)) {
      const event = new CustomEvent("triggerHint", { detail: currentLevel });
      window.dispatchEvent(event);
    }
  }, [currentLevel]);

  const handleAnswer = (selected) => {
    const q = mathLevels[currentLevel];
    const correct = selected === q.correct;

    setAnswers((prev) => [...prev, { level: currentLevel, selected, correct }]);

    if (currentLevel < 20) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      clearInterval(intervalRef.current);
      const totalCorrect = answers.filter((a) => a.correct).length + (correct ? 1 : 0);
      const accuracyPercent = ((totalCorrect / 20) * 100).toFixed(1);
      const formattedTime = formatTime(Date.now() - startTime);

      localStorage.setItem(
        "task3Results",
        JSON.stringify({
          time: formattedTime,
          correct: totalCorrect,
          total: 20,
          accuracy: accuracyPercent,
        })
      );

      setTaskCompleted(true); // ✅ go to end screen instead of summary immediately
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const question = mathLevels[currentLevel];

  // ✅ Task 3 End Screen
  if (taskCompleted) {
    const endEvent = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(endEvent);

    const totalCorrect = answers.filter((a) => a.correct).length;
    const accuracyPercent = ((totalCorrect / 20) * 100).toFixed(1);
    const formattedTime = formatTime(taskElapsedTime);

    return (
      <div className="task3-container">
        <h2>🎉 Task 3 Complete!</h2>
        <p>You've completed all 20 math questions!</p>
        <p>Total Task Time: {formattedTime}</p>
        <p>You answered {totalCorrect} out of 20 questions correctly.</p>
        <p>Accuracy: <strong>{accuracyPercent}%</strong></p>
        <button onClick={() => navigate("/summary")}>Proceed to Summary</button>
      </div>
    );
  }

  // 🔥 Normal Game Screen (still solving)
  return (
    <div className="task3-container">
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
        ⏱️ Time: {formatTime(taskElapsedTime)}
      </p>

      <h2>🧮 Level {currentLevel}</h2>
      <p>{question.question}</p>
      <div className="options">
        {question.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Task3;