// src/components/Task4Instructions.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Task4Instructions() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>🧩 Task 4: Odd-One-Out</h2>

      <p>
        In this task, you will see a <strong>grid of emojis</strong>. 
        One of the emojis will be <strong>different from all the others</strong>.
      </p>

      <h3>🧠 How It Works</h3>
      <ul>
        <li>👀 Look carefully at the entire grid.</li>
        <li>🎯 Find the emoji that is <strong>different</strong>.</li>
        <li>🖱️ <strong>Click</strong> the odd one to move to the next level.</li>
      </ul>

      <h3>📊 What We Measure</h3>
      <ul>
        <li>⏱️ Your <strong>total time</strong> to complete the task.</li>
      </ul>

      <p>
        The grids will become <strong>harder and harder </strong> 
        as you progress, with more emojis and smaller differences. Stay sharp! 💪
      </p>

      <button onClick={() => navigate("/task4")} style={{ marginTop: "2rem" }}>
        Start Task
      </button>
    </div>
  );
}

export default Task4Instructions;
