// src/components/Task3Instructions.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Task3Instructions() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>➕ Task 3: Quick Math</h2>
      <p>
        In this final task, you’ll solve a series of arithmetic problems. These will gradually increase in difficulty — starting with simple addition and ending with equations, square roots, and fractions.
      </p>

      <h3>🧠 What to Expect</h3>
      <ul>
        <li>🧮 20 multiple-choice questions</li>
        <li>🔢 Topics include: addition, subtraction, multiplication, division, square roots, and simple equations</li>
        <li>🧗‍♂️ Difficulty increases as you progress</li>
      </ul>

      <h3>🎮 How to Play</h3>
      <ul>
        <li>👁️ You’ll see one question at a time with four possible answers</li>
        <li>✅ Click the answer you believe is correct</li>
        <li>🚀 Once you answer, the next question will appear automatically</li>
      </ul>

      <h3>📊 What We Measure</h3>
      <ul>
        <li>⏱️ How long you take to complete the full task</li>
        <li>✅ How many correct answers you get</li>
        <li>📉 Accuracy and speed across all 30 questions</li>
      </ul>

      <p>
        Try to be both <strong>fast</strong> and <strong>accurate</strong> — your performance matters!
      </p>

      <button onClick={() => navigate("/task3")}>Start Task</button>
    </div>
  );
}

export default Task3Instructions;
