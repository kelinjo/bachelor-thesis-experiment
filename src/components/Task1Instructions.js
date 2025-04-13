import React from "react";
import { useNavigate } from "react-router-dom";

function Task1Instructions() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Task 1: Pattern Matching</h2>
      <p>
        You will see a grid showing a pattern for a few seconds. Your task is to remember and replicate the pattern as accurately as possible.
      </p>
      <button onClick={() => navigate("/task1")}>Start Task</button>
    </div>
  );
}

export default Task1Instructions;
