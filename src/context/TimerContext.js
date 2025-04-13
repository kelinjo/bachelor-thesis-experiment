import React, { createContext, useState, useEffect } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // in seconds
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const startTimer = () => {
    const now = Date.now();
    setStartTime(now);
    setEndTime(null);
    setElapsedTime(0);
  };

  const stopTimer = () => {
    setEndTime(Date.now());
  };

  return (
    <TimerContext.Provider value={{ startTime, endTime, elapsedTime, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
