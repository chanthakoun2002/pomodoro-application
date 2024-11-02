import React, { useState, useEffect } from 'react';

const Timer = ({settings}) => { 
  //if user is not logged in a default settings and times will be used
  const [time, setTime] = useState(settings.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [completedSessions, setCompletedSessions] = useState(0); //track how many regular session before a long break
  const autoSwitch = true; //this is temporary

  useEffect(() => { //runs when settings or mode changes
    switch (mode) {
      case 'pomodoro':
        setTime(settings.workDuration * 60);
        break;
      case 'shortBreak':
        setTime(settings.shortBreakDuration * 60);
        break;
      case 'longBreak':
        setTime(settings.longBreakDuration * 60);
        break;
      default:
        break;
    }
  }, [settings, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
  };

  //handles mode changes
  // const handleModeChange = (mode) => {
  //   if (mode === 'pomodoro') setTime(settings.workDuration * 60);
  //   if (mode === 'shortBreak') setTime(settings.shortBreakDuration * 60);
  //   if (mode === 'longBreak') setTime(settings.longBreakDuration *60);
  //   setIsActive(false);
  // };
  // useEffect(() => {
  //   let interval = null;
  //   if (isActive && time > 0) {
  //     interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
  //   } else if (!isActive && time !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, time]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
       
      if (autoSwitch) { 
        switch (mode) {
          case 'pomodoro':
            // increment work session count
            setCompletedSessions((prevCount) => prevCount + 1);
            console.log("Session completed: " + completedSessions);//for debugging
            if (completedSessions + 1 >= settings.sessionBeforeLongBreak) {
              // go to long break if session count reaches limit
              console.log("Long Break");
              setMode('longBreak');
              setTime(settings.longBreakDuration * 60);
              setCompletedSessions(0); // Reset work session count after long break
            } else {
              setMode('shortBreak');
              setTime(settings.shortBreakDuration * 60);
            }
            break;
          case 'shortBreak':
            setMode('pomodoro');
            setTime(settings.workDuration * 60);
            break;
          case 'longBreak':
            setMode('pomodoro');
            setTime(settings.workDuration * 60);
            break;
          default:
            break;
        }
        //setIsActive(true); // Resume automatically in the new mode
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode, autoSwitch, settings, completedSessions]);

  // resets timer when user want based on what timer we are in
  const resetTimer = () => {
    // setTime(settings.workDuration * 60);
    // setMode('pomodoro');
    // setCompletedSessions(0);//session count reset 

    setIsActive(false);
    switch(mode) {
      case 'pomodoro':
        setTime(settings.workDuration * 60);
        break;
      case 'shortBreak':
        setTime(settings.shortBreakDuration * 60);
        break;
      case 'longBreak':
        setTime(settings.longBreakDuration * 60);
        break;
      default:
        setTime(settings.workDuration * 60);
    }
  };

  const skipTime = () => {
    setTime((prevTime) => (prevTime > 60? prevTime -60 :0)); //skips a min on timer, for testing purposes
  }

  return (
    <div className="timer-component">
        <div className='timer-component-time-selection'>
            <button onClick={() => handleModeChange('pomodoro')}>Pomodoro</button>
            <button onClick={() => handleModeChange('Short Break')}>Short Break</button>
            <button onClick={() => handleModeChange('Long Break')}>Long Break</button>
        </div>

      <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)} Timer</h2>
      <div className='timer-component-count'>
        <h3>
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
        </h3>
      </div>
      <div className='timer-component-actions'>
        <button onClick={() => setIsActive(true)}>Start</button>
        <button onClick={() => setIsActive(false)}>Pause</button>
        <button onClick={resetTimer}>Reset</button> 
        <button onClick={skipTime}>Skip 1 min</button>
      </div>
      
    </div>
  );
};

export default Timer;
