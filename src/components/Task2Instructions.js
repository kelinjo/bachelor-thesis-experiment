// src/components/Task2Instructions.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Task2Instructions() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/task2");
  };

  return (
    <div className="task2-instructions container">
      <h2>🧩 Task 2: Move Disks Between Boxes</h2>

      <p>
        In this task, your goal is to move all the <strong>disks</strong> from the first <strong>box</strong> to the last <strong>box</strong>, following these rules:
      </p>

      <ul>
        <li>🔄 You can only move <strong>one disk at a time</strong>.</li>
        <li>🪜 You can only move the <strong>top disk</strong> from any box.</li>
        <li>📏 You <strong>cannot place a larger disk on top of a smaller one</strong>.</li>
        <li>🎯 To complete the level, you must <strong>replicate the exact starting arrangement</strong> in the third box (largest disk at the bottom, smallest at the top).</li>
      </ul>

      <p>
        Your performance will be evaluated based on:
      </p>
      <ul>
        <li>⏱️ How fast you complete the task</li>
        <li>📦 How many moves you made</li>
        <li>📈 How efficient you were compared to the optimal solution</li>
      </ul>

      <h3>🎮 How to Play</h3>
      <p>
        Click on the <strong>box</strong> from which you want to move a disk — it will become <strong>highlighted</strong>. Then click on the target box where you want to place the disk.
      </p>
      <p>
        If you change your mind after selecting a box, simply click it again to deselect it.
      </p>

      <button
        onClick={handleStart}
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#f5f5f5",
          color: "#222",
          cursor: "pointer",
        }}
      >
        🚀 Start Task
      </button>
    </div>
  );
}

export default Task2Instructions;
