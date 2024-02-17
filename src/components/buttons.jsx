import React, { useState, useEffect } from 'react';

const TimerButtons = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div>
        <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button style={buttonStyle} onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
    </div>
      <p style={elapsedTimeStyle}>Elapsed Time: {elapsedTime} seconds</p>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '20px',
  justifyContent: 'center',
};

const buttonStyle = {
  padding: '10px 15px',
  margin: '5px',
  fontSize: '16px',
  cursor: 'pointer',
};

const elapsedTimeStyle = {
  fontSize: '18px',
  margin: '10px 0',
};

export default TimerButtons;
