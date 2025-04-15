// src/components/Task1Instructions.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Task1Instructions() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>🧠 Task 1: Pattern Matching</h2>
      <p>
        In this task, you’ll be shown a grid with a visual pattern. Your goal is to <strong>memorize the pattern</strong> and then <strong>replicate it as accurately as possible</strong>.
      </p>

      <h3>🕹️ How It Works</h3>
      <ul>
        <li>👀 A grid will appear showing a highlighted pattern for <strong>2 seconds</strong>.</li>
        <li>🧠 Try to memorize the locations of the highlighted cells.</li>
        <li>🎯 After the pattern disappears, click the cells to recreate it.</li>
        <li>🚫 You have a limited number of clicks, including a few errors allowed!</li>
      </ul>

      <h3>📊 What We Measure</h3>
      <ul>
        <li>⏱️ How long it takes you to complete the task</li>
        <li>✅ How accurately you remember and recreate the pattern</li>
      </ul>

      <p>
        Try to complete each level as quickly and accurately as possible. Good luck!
      </p>

      <button onClick={() => navigate("/task1")}>Start Task</button>
    </div>
  );
}

export default Task1Instructions;
