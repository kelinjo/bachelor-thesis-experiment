// src/components/Task4.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Task4.css";

const emojiLevels = [
  { base: "🌖", odd: "🌕", gridSize: 8 },
  { base: "👩‍💻", odd: "👨‍💻", gridSize: 8 },
  { base: "👨‍✈️", odd: "👩‍✈️", gridSize: 8 },
  { base: "😃", odd: "😄", gridSize: 8 },
  { base: "🙂", odd: "🙃", gridSize: 8 },
  { base: "👨‍⚖️", odd: "👩‍⚖️", gridSize: 8 },
  { base: "👨‍🎤", odd: "👩‍🎤", gridSize: 9 },
  { base: "👩‍🔧", odd: "👨‍🔧", gridSize: 9 },
  { base: "😐", odd: "😶", gridSize: 9 },
  { base: "👨‍🦱", odd: "👩‍🦱", gridSize: 9 },
  { base: "👨‍🌾", odd: "👩‍🌾", gridSize: 9 },
  { base: "😅", odd: "😓", gridSize: 9 },
  { base: "😐", odd: "😑", gridSize: 9 },
  { base: "😺", odd: "😸", gridSize: 10 },
  { base: "👨‍🏫", odd: "👩‍🏫", gridSize: 10 },
  { base: "👨‍🎓", odd: "👩‍🎓", gridSize: 10 },
  { base: "👩‍🔬", odd: "👨‍🔬", gridSize: 10 },
  { base: "😈", odd: "👿", gridSize: 10 },
  { base: "🌑", odd: "🌚", gridSize: 10 },
  { base: "👨‍🍳", odd: "👩‍🍳", gridSize: 10 },
];

function Task4() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [grid, setGrid] = useState([]);
  const [oddPosition, setOddPosition] = useState({ row: 0, col: 0 });
  const [taskStartTime, setTaskStartTime] = useState(Date.now());
  const [taskElapsedTime, setTaskElapsedTime] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const intervalRef = useRef(null);

  const totalLevels = emojiLevels.length;

  useEffect(() => {
    setupGrid(currentLevel);
    setTaskStartTime(Date.now());

    intervalRef.current = setInterval(() => {
      setTaskElapsedTime(Date.now() - taskStartTime);
    }, 1000);

    // ✅ Task 4 is starting, allow notifications
    const startEvent = new CustomEvent("taskStatus", { detail: "start" });
    window.dispatchEvent(startEvent);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentLevel > totalLevels) {
      completeTask();
    } else {
      setupGrid(currentLevel);
    }
    // eslint-disable-next-line
  }, [currentLevel]);

  const setupGrid = (level) => {
    const { base, odd, gridSize } = emojiLevels[level - 1];

    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => base)
    );

    let randomRow, randomCol;

    if (Math.random() < 0.5 && gridSize > 4) {
      randomRow = Math.floor(Math.random() * (gridSize - 2)) + 1;
      randomCol = Math.floor(Math.random() * (gridSize - 2)) + 1;
    } else {
      randomRow = Math.floor(Math.random() * gridSize);
      randomCol = Math.floor(Math.random() * gridSize);
    }

    newGrid[randomRow][randomCol] = odd;

    setGrid(newGrid);
    setOddPosition({ row: randomRow, col: randomCol });
  };

  const handleCellClick = (row, col) => {
    if (row === oddPosition.row && col === oddPosition.col) {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  const completeTask = () => {
    clearInterval(intervalRef.current);
    setTaskCompleted(true);

    const formattedTime = formatTime(taskElapsedTime);

    localStorage.setItem(
      "task4Results",
      JSON.stringify({
        time: formattedTime,
        levelsCompleted: totalLevels,
      })
    );

    // ✅ Task 4 is ending, stop notifications
    const endEvent = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(endEvent);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (taskCompleted) {
    const formattedTime = formatTime(taskElapsedTime);
    return (
      <div className="task4-container">
        <h2>🎉 Task 4 Complete!</h2>
        <p>You've completed the Odd-One-Out task!</p>
        <p>⏱️ Total Time: {formattedTime}</p>

        <button onClick={() => navigate("/summary")} style={{ marginTop: "2rem" }}>
          Proceed to Summary
        </button>
      </div>
    );
  }

  return (
    <div className="task4-container">
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
        🧠 Task 4 Time: {formatTime(taskElapsedTime)}
      </p>

      <h2>Level {currentLevel}</h2>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.length}, 50px)`,
          gap: "8px",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                fontSize: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Task4;
