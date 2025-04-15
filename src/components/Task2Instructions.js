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
      <h2>🗼 Task 2: Tower of Hanoi</h2>
      <p>
        In this task, you'll solve the classic Tower of Hanoi puzzle. Your goal is to move all the disks from the first peg to the third peg, following these rules:
      </p>
      <ul>
        <li>🔄 You can only move <strong>one disk at a time</strong>.</li>
        <li>🪜 You may only move the <strong>top disk</strong> from any peg.</li>
        <li>📏 You <strong>cannot place a larger disk on top of a smaller one</strong>.</li>
      </ul>

      <p>
        Your performance will be evaluated based on:
      </p>
      <ul>
        <li>⏱️ Time it takes to complete the task</li>
        <li>📦 Number of moves made</li>
        <li>📈 Efficiency compared to the optimal number of moves</li>
      </ul>

      <h3>🎮 How to Play</h3>
      <p>
        Click on the peg from which you want to move a disk — this peg will become <strong>highlighted with a blue border</strong>. Then, click on the target peg where you'd like to move the selected disk. The game will only allow valid moves (e.g., no placing larger disks on smaller ones).
      </p>
      <p>
        If you accidentally select the wrong peg, simply click it again to deselect.
      </p>

      {/* You can insert a diagram here later if you like */}
      {/* <img src="path/to/hanoi-diagram.png" alt="Tower of Hanoi Example" /> */}

      <button onClick={handleStart}>Start Task</button>
    </div>
  );
}

export default Task2Instructions;
