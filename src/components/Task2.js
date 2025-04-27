// src/components/Task2.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Task2.css";

const levels = {
  1: { diskCount: 3, pegCount: 3 }, 
  2: { diskCount: 4, pegCount: 3 }, 
};

function Task2() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [pegs, setPegs] = useState([[], [], []]);
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [taskElapsedTime, setTaskElapsedTime] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!taskCompleted) {
      const startEvent = new CustomEvent("taskStatus", { detail: "start" });
      window.dispatchEvent(startEvent);
    }
  }, [taskCompleted]);

  const level = levels[currentLevel];
  const diskCount = level?.diskCount;
  const pegCount = level?.pegCount;

  const totalOptimalMoves = Object.values(levels)
    .map((lvl) => Math.pow(2, lvl.diskCount) - 1)
    .reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    const start = Date.now();
    setTaskStartTime(start);

    intervalRef.current = setInterval(() => {
      setTaskElapsedTime(Date.now() - start);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!level) return;
    const initialPegs = Array.from({ length: pegCount }, () => []);
    initialPegs[0] = Array.from({ length: diskCount }, (_, i) => diskCount - i);
    setPegs(initialPegs);
    setMoveCount(0);
    setSelectedPeg(null);
  }, [currentLevel]);

  useEffect(() => {
    const isFinalLevel = !levels[currentLevel + 1];
    const isCorrectOrder =
      pegs[pegCount - 1].length === diskCount &&
      [...pegs[pegCount - 1]].join(",") ===
        Array.from({ length: diskCount }, (_, i) => diskCount - i).join(",");

    if (level && isFinalLevel && isCorrectOrder && !taskCompleted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const formattedTime = formatTime(taskElapsedTime);
      const efficiency = ((totalOptimalMoves / totalMoves) * 100).toFixed(1);

      localStorage.setItem(
        "task2Results",
        JSON.stringify({
          time: formattedTime,
          moves: totalMoves,
          efficiency,
        })
      );

      console.log("📊 Task 2 complete:", formattedTime, `${totalMoves} moves`);
      setTaskCompleted(true);
    }
  }, [pegs, currentLevel, taskCompleted, taskElapsedTime, totalMoves]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePegClick = (pegIndex) => {
    if (selectedPeg === null) {
      if (pegs[pegIndex].length === 0) return;
      setSelectedPeg(pegIndex);
    } else {
      if (selectedPeg === pegIndex) {
        setSelectedPeg(null);
        return;
      }

      const from = [...pegs[selectedPeg]];
      const to = [...pegs[pegIndex]];
      const diskToMove = from[from.length - 1];

      if (to.length === 0 || diskToMove < to[to.length - 1]) {
        from.pop();
        to.push(diskToMove);

        const newPegs = [...pegs];
        newPegs[selectedPeg] = from;
        newPegs[pegIndex] = to;

        setPegs(newPegs);
        setMoveCount((prev) => prev + 1);
        setTotalMoves((prev) => prev + 1);
      }

      setSelectedPeg(null);
    }
  };

  const isLevelComplete = () => {
    return (
      pegs[pegCount - 1].length === diskCount &&
      [...pegs[pegCount - 1]].join(",") ===
        Array.from({ length: diskCount }, (_, i) => diskCount - i).join(",")
    );
  };

  const optimalMoves = Math.pow(2, diskCount) - 1;

  // 🛑 Handle DND button press
  const handleDND = () => {
    localStorage.setItem("dndActivated", "true");
    const event = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(event);
  };

  // ✅ Final screen
  if (taskCompleted) {
    const endEvent = new CustomEvent("taskStatus", { detail: "end" });
    window.dispatchEvent(endEvent);

    const formattedTime = formatTime(taskElapsedTime);
    const efficiency = ((totalOptimalMoves / totalMoves) * 100).toFixed(1);

    return (
      <div className="task2-container">
        <h2>🎉 Task 2 Complete!</h2>
        <p>You’ve finished all Tower of Hanoi levels!</p>
        <p>Total Task Time: {formattedTime}</p>
        <p>Total Moves Made: {totalMoves}</p>
        <p>Efficiency: <strong>{efficiency}%</strong></p>
        <button onClick={() => navigate("/task3-instructions")}>Next Task</button>
      </div>
    );
  }

  return (
    <div className="task2-container">
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
        🧠 Task 2 Time: {formatTime(taskElapsedTime)}
      </p>

      {/* 🛑 DND BUTTON only if not already activated */}
      {localStorage.getItem("dndActivated") !== "true" && (
       <button
          onClick={handleDND}
          style={{
            position: "fixed",
            top: "100px",         // ⬅️ Moved down below timer
            right: "20px",       // ⬅️ Same side as timer (right side)
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 12px",
            fontWeight: "bold",
            cursor: "pointer",
            zIndex: 1000,        // ⬅️ Always above everything
          }}
        >
          🛑 Do Not Disturb
      </button>
      )}

      <h2>🗼 Task 2: Tower of Hanoi</h2>
      <p>
        Level {currentLevel} – Disks: {diskCount}, Pegs: {pegCount}
      </p>
      <p>
        📦 Moves: <strong>{moveCount}</strong> | 🧠 Optimal:{" "}
        <strong>{optimalMoves}</strong>
      </p>

      <div className="peg-area">
        {pegs.map((peg, index) => (
          <div
            key={index}
            className={`peg ${selectedPeg === index ? "selected" : ""}`}
            onClick={() => handlePegClick(index)}
          >
            {peg.map((disk, i) => (
              <div
                key={i}
                className="disk"
                style={{ width: `${disk * 90}px` }}
              >
                {disk}
              </div>
            ))}
          </div>
        ))}
      </div>

      {isLevelComplete() && levels[currentLevel + 1] && (
        <div className="level-complete">
          <p>✅ Level complete in {moveCount} moves!</p>
          <button onClick={() => setCurrentLevel((prev) => prev + 1)}>
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default Task2;

