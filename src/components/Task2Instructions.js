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
        In this task, you'll solve the classic Tower of Hanoi puzzle. Your goal is to move all the disks from the first peg to the third peg, following the rules below:
      </p>
      <ul>
        <li>🔄 Only one disk can be moved at a time</li>
        <li>🪜 You may only move the top disk of a stack</li>
        <li>📏 No disk may be placed on top of a smaller disk</li>
      </ul>
      <p>
        Try to complete the puzzle as quickly and efficiently as possible. We’ll be measuring your time and move count.
      </p>

      {/* Placeholder for future image */}
      {/* <img src="path/to/hanoi-diagram.png" alt="Tower of Hanoi Example" /> */}

      <button onClick={handleStart}>Start Task</button>
    </div>
  );
}

export default Task2Instructions;
