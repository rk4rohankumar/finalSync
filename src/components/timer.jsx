import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
// import audio from './audio.mp3';

const CountdownTimer = () => {
  const [inputTime, setInputTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Play a sound when the countdown reaches zero
      // You can replace this with your sound-playing logic
      // For example, you can use the HTML5 Audio API or a third-party library like Howler.js
      const sound = new Howl({
        src: ['audio.mp3'],
      });
      
      sound.play();

      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const startTimer = () => {
    if (!isNaN(inputTime) && inputTime > 0) {
      setTimeLeft(parseInt(inputTime, 10));
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(null);
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <label htmlFor="timeInput">Enter time (seconds):</label>
      <input
        type="number"
        id="timeInput"
        value={inputTime}
        onChange={handleInputChange}
        disabled={isRunning}
      />
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      {timeLeft !== null && <p>Time left: {timeLeft} seconds</p>}
    </div>
  );
};

export default CountdownTimer;
