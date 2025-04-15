
import "../styles/Task1.css";
import { useNavigate } from "react-router-dom"; // Make sure this is at the top
import React, { useEffect, useState, useRef } from "react";


const levelPatterns = {
    1: {
      pattern: [
        [0, 1],
        [1, 2],
        [2, 1],
        [3, 3],
      ],
      gridSize: 4,
      allowedErrors: 1,
    },
    2: {
      pattern: [
        [0, 1],
        [1, 3],
        [3, 1],
        [4, 2],
        [4, 0], // Updated this — [5,0] was out of 5x5 bounds
      ],
      gridSize: 5,
      allowedErrors: 1,
    }, 
    3: {
      pattern: [
        [0, 0],
        [0, 4],
        [2, 2],
        [4, 0],
        [4, 4],
        [1, 3],
      ],
      gridSize: 5,
      allowedErrors: 1,
    },
    
    4: {
      pattern: [
        [0, 0],
        [0, 4],
        [1, 2],
        [2, 1],
        [3, 3],
        [4, 0],
        [4, 4],
      ],
      gridSize: 5,
      allowedErrors: 1,
    },
    5: {
      pattern: [
        [0, 1],
        [1, 2],
        [2, 1],
        [3, 3],
        [4, 0],
        [4, 2],
        [4, 4],
        [3, 2],
      ],
      gridSize: 5,
      allowedErrors: 1,
    },
    6: {
      pattern: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
        [3, 4],
        [4, 2],
        [4, 3],
      ],
      gridSize: 6,
      allowedErrors: 1,
    },
    7: {
      pattern: [
        [0, 0],
        [0, 4],
        [1, 1],
        [2, 3],
        [3, 1],
        [3, 4],
        [4, 0],
        [4, 5],
      ],
      gridSize: 6,
      allowedErrors: 2,
    },
    8: {
      pattern: [
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 3],
        [4, 1],
        [4, 4],
        [5, 0],
        [5, 5],
        [3, 2],
      ],
      gridSize: 6,
      allowedErrors: 2,
    }, 
    9: {
      pattern: [
        [0, 0],
        [1, 4],
        [2, 2],
        [3, 5],
        [4, 1],
        [4, 3],
        [5, 0],
        [5, 5],
        [6, 2],
        [6, 4],
      ],
      gridSize: 6,
      allowedErrors: 2,
    },
    10: {
        pattern: [
          [0, 2],
          [1, 4],
          [2, 1],
          [3, 3],
          [4, 5],
          [5, 2],
          [2, 4],
          [3, 1],
          [4, 0],
          [5, 5],
        ],
        gridSize: 6,
        allowedErrors: 2,
      },
      11: {
        pattern: [
          [0, 3],
          [1, 0],
          [2, 5],
          [3, 2],
          [4, 1],
          [5, 4],
          [1, 2],
          [2, 3],
          [3, 5],
          [4, 0],
        ],
        gridSize: 7,
        allowedErrors: 3,
      },
      12: {
        pattern: [
          [0, 1],
          [1, 5],
          [2, 0],
          [3, 4],
          [4, 2],
          [5, 6],
          [2, 5],
          [3, 0],
          [4, 3],
          [5, 1],
          [6, 4],
        ],
        gridSize: 7,
        allowedErrors: 3,
      },
    
    
  };

  const Task1 = () => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [showPattern, setShowPattern] = useState(true);
    const [userGrid, setUserGrid] = useState([]);
    const [clicksLeft, setClicksLeft] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [correctCells, setCorrectCells] = useState([]);
    const [incorrectCells, setIncorrectCells] = useState([]);
    const [missedCells, setMissedCells] = useState([]);
    const [levelCompleted, setLevelCompleted] = useState(false);
  
    const [taskStartTime, setTaskStartTime] = useState(null);
    const [taskElapsedTime, setTaskElapsedTime] = useState(0);
    const intervalRef = useRef(null);
  
    // ✅ New: Tracking accuracy across all levels
    const [totalCorrectGuesses, setTotalCorrectGuesses] = useState(0);
    const [totalRequiredPatternCells, setTotalRequiredPatternCells] = useState(0);
  
    const navigate = useNavigate();
  
    const level = levelPatterns[currentLevel]; // may be undefined
    const pattern = level?.pattern || [];
    const gridSize = level?.gridSize || 0;
    const allowedErrors = level?.allowedErrors || 0;
    const totalPatternCells = pattern.length;
    const totalAllowedClicks = totalPatternCells + allowedErrors;
  
    const formatTime = (ms) => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
      const seconds = (totalSeconds % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
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
  
      setClicksLeft(totalAllowedClicks);
      const timer = setTimeout(() => {
        setShowPattern(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, [currentLevel, level, totalAllowedClicks]);
  
    // 🎯 FINAL LEVEL COMPLETE — SHOW SUMMARY + STOP TIMER
    if (!level) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    
      const formattedTime = formatTime(taskElapsedTime);
      const accuracyPercent = ((totalCorrectGuesses / totalRequiredPatternCells) * 100).toFixed(1);
    
      // ✅ Save task results to localStorage
      localStorage.setItem(
        "task1Results",
        JSON.stringify({
          time: formattedTime,
          correct: totalCorrectGuesses,
          total: totalRequiredPatternCells,
          accuracy: accuracyPercent
        })
      );
    
      return (
        <div className="task1-container">
          <h2>🎉 Task 1 Complete!</h2>
          <p>You've completed all the levels in the Pattern Matching task.</p>
          <p>Well done! You can now proceed to the next task.</p>
          <p>Total Task Time: {formattedTime}</p>
          <p>
            You guessed {totalCorrectGuesses} out of {totalRequiredPatternCells} pattern cells correctly.<br />
            Your accuracy was: <strong>{accuracyPercent}%</strong>
          </p>
          <button onClick={() => navigate("/task2-instructions")}>Proceed to Task 2</button>
        </div>
      );
    }
    
  
    const handleCellClick = (row, col) => {
      if (showPattern || submitted || clicksLeft <= 0) return;
  
      const alreadyClicked = userGrid.some(([r, c]) => r === row && c === col);
      if (alreadyClicked) return;
  
      const updatedGrid = [...userGrid, [row, col]];
      setUserGrid(updatedGrid);
      setClicksLeft((prev) => prev - 1);
  
      const correctClicks = updatedGrid.filter(([r, c]) =>
        pattern.some(([pr, pc]) => pr === r && pc === c)
      );
  
      const gotAllCorrect = correctClicks.length === totalPatternCells;
  
      if (gotAllCorrect || updatedGrid.length === totalAllowedClicks) {
        evaluateGuess(updatedGrid);
      }
    };
  
    const evaluateGuess = (guesses) => {
      const correct = guesses.filter(([r, c]) =>
        pattern.some(([pr, pc]) => pr === r && pc === c)
      );
  
      const incorrect = guesses.filter(([r, c]) =>
        !pattern.some(([pr, pc]) => pr === r && pc === c)
      );
  
      const missed = pattern.filter(
        ([r, c]) => !guesses.some(([gr, gc]) => gr === r && gc === c)
      );
  
      setCorrectCells(correct);
      setIncorrectCells(incorrect);
      setMissedCells(missed);
      setSubmitted(true);
      setLevelCompleted(true);
  
      // ✅ Update total stats
      setTotalCorrectGuesses(prev => prev + correct.length);
      setTotalRequiredPatternCells(prev => prev + totalPatternCells);
  
      console.log(`✅ Level ${currentLevel} correct: ${correct.length} / ${totalPatternCells}`);
    };
  
    const nextLevel = () => {
      setCurrentLevel((prev) => prev + 1);
      setUserGrid([]);
      setSubmitted(false);
      setCorrectCells([]);
      setIncorrectCells([]);
      setMissedCells([]);
      setLevelCompleted(false);
      setShowPattern(true);
    };
  
    const isCellInPattern = (r, c) => pattern.some(([pr, pc]) => pr === r && pc === c);
    const isCellClicked = (r, c) => userGrid.some(([ur, uc]) => ur === r && uc === c);
    const isCellCorrect = (r, c) => correctCells.some(([cr, cc]) => cr === r && cc === c);
    const isCellIncorrect = (r, c) => incorrectCells.some(([ir, ic]) => ir === r && ic === c);
    const isCellMissed = (r, c) => missedCells.some(([mr, mc]) => mr === r && mc === c);
  
    const getCellSize = () => {
      if (gridSize <= 5) return 80;
      if (gridSize <= 7) return 68;
      return 40;
    };
  
    return (
      <div className="task1-container">
        <h2>Task 1: Pattern Matching</h2>
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
          🧠 Task 1 Time: {formatTime(taskElapsedTime)}
        </p>
  
        <h3>Level {currentLevel}</h3>
  
        {showPattern && <p>Memorize the pattern!</p>}
        {!showPattern && !submitted && (
          <p>
            Click the pattern (you have {clicksLeft} click{clicksLeft !== 1 && "s left"}).
          </p>
        )}
        {submitted && (
          <p>
            You got {correctCells.length} out of {totalPatternCells} correct.
          </p>
        )}
  
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, ${getCellSize()}px)`,
            gap: "5px",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => {
              const showBlue = showPattern && isCellInPattern(row, col);
              const clicked = isCellClicked(row, col);
              const wasCorrectClick = clicked && pattern.some(([pr, pc]) => pr === row && pc === col);
              const wasWrongClick = clicked && !wasCorrectClick;
              const correct = submitted && isCellCorrect(row, col);
              const incorrect = submitted && isCellIncorrect(row, col);
              const missed = submitted && isCellMissed(row, col);
  
              return (
                <div
                  key={`${row}-${col}`}
                  className={`cell 
                    ${showBlue ? "pattern" : ""} 
                    ${wasCorrectClick ? "clicked" : ""} 
                    ${wasWrongClick ? "wrong" : ""}
                    ${correct ? "correct" : ""} 
                    ${incorrect ? "wrong" : ""}
                    ${missed ? "missed" : ""}
                  `}
                  onClick={() => handleCellClick(row, col)}
                  style={{
                    width: `${getCellSize()}px`,
                    height: `${getCellSize()}px`,
                  }}
                />
              );
            })
          )}
        </div>
  
        {levelCompleted && (
          <button className="next-level-btn" onClick={nextLevel}>
            Next Level
          </button>
        )}
      </div>
    );
  };
  
  export default Task1;
  