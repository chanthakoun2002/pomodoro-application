import React, { useState, useEffect } from 'react';

const Timer = ({settings,onPomodoroCount}) => { 
  //if user is not logged in a default settings and times will be used
  const [time, setTime] = useState(settings.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [completedSessions, setCompletedSessions] = useState(0); //track how many regular session before a long break
  const autoSwitch = true; //this is temporary| that was a lie...

  const notificationSound = new Audio('/simple-notification-152054.mp3');

  useEffect(() => { // Runs when settings or mode changes
    switch (mode) {
      case 'pomodoro':
        setTime(settings.workDuration * 60);
        break;
      case 'Short Break':
        setTime(settings.shortBreakDuration * 60);
        break;
      case 'Long Break':
        setTime(settings.longBreakDuration * 60);
        break;
      default:
        break;
    }
  }, [settings, mode]);

  const notification = () => {
    if (settings.sound) {
      notificationSound.play().catch(error => console.log('notification sound failed:', error))
    }else {
      alert('Timer Finished')
    }
  }

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
      
    } else if (isActive && time === 0) {
      setIsActive(false);
      
      notification();
       
      if (autoSwitch) { 
        switch (mode) {
          case 'pomodoro':
            // increment work session count
            onPomodoroCount(); //count for tasks
            setCompletedSessions((prevCount) => prevCount + 1);
            console.log("Session completed: " + completedSessions);//for debugging
            if (completedSessions + 1 >= settings.sessionsBeforeLongBreak) {
              // go to long break if session count reaches limit
              console.log("Long Break");
              setMode('Long Break');
              setTime(settings.longBreakDuration * 60);
              setCompletedSessions(0); // Reset work session count after long break
            } else {
              setMode('Short Break');
              setTime(settings.shortBreakDuration * 60);
            }
            break;
          case 'Short Break':
            setMode('pomodoro');
            setTime(settings.workDuration * 60);
            break;
          case 'Long Break':
            setMode('pomodoro');
            setTime(settings.workDuration * 60);
            break;
          default:
            break;
        }
        //setIsActive(true); // Resume automatically in the new mode, should add this as a setting
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode, autoSwitch, settings, completedSessions]);

  // Reset timer logic for button
  const resetTimer = () => {
    setIsActive(false);
    switch(mode) {
      case 'pomodoro':
        setTime(settings.workDuration * 60);
        break;
      case 'Short Break':
        setTime(settings.shortBreakDuration * 60);
        break;
      case 'Long Break':
        setTime(settings.longBreakDuration * 60);
        break;
      default:
        setTime(settings.workDuration * 60);
    }
  };

  const skipTime = () => {
    // Skips time and goes to next expected timer mode
    setTime(0);
    setIsActive(true);
    
  }

  return (
    <section className="timer-component">
        <div className='timer-component-time-selection'>
            <button onClick={() => handleModeChange('pomodoro')}>Pomodoro Timer</button>
            <button onClick={() => handleModeChange('Short Break')}>Short Break</button>
            <button onClick={() => handleModeChange('Long Break')}>Long Break</button>
        </div>

      <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)}</h2>
      <div className='timer-component-count'>
        <h3>
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
        </h3>
      </div>
      <div className='timer-component-actions'>
        {/* <button onClick={() => setIsActive(true)}>Start</button>
        <button onClick={() => setIsActive(false)}>Pause</button> */}
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button> 
        <button onClick={skipTime}>Skip</button>
      </div>
      
    </section>
  );
};

export default Timer;
