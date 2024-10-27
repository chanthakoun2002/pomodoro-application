import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  //handles mode changes
  const handleModeChange = (mode) => {
    if(mode === 'Pomodoro') setTime(1500); //25 min
    if(mode === 'Short Break') setTime(300); //5 min
    if(mode === 'Long Break') setTime(900); //15 min
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const resetTimer = () => setTime(1500);

  return (
    <div className="timer-component">
        <div className='timer-component-time-selection'>
            <button onClick={() => handleModeChange('Pomodoro')}>Pomodoro</button>
            <button onClick={() => handleModeChange('Short Break')}>Short Break</button>
            <button onClick={() => handleModeChange('Long Break')}>Long Break</button>
        </div>
        
      <h2>timer</h2>
      <div className='timer-component-count'>
        <h3>
           {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
        </h3>
      </div>
      <div className='timer-component-actions'>
        <button onClick={() => setIsActive(true)}>Start</button>
        <button onClick={() => setIsActive(false)}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      
    </div>
  );
};

export default Timer;
