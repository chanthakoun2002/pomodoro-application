import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Timer from './components/timer';
import Pomodoro from './components/pomodoroApp';
import Navbar from './components/navbar';
import Information from './components/information'; 


function App() {
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <Router>
      <div className="App">
        <main>
          <Navbar openSettings={openSettings}/>
          {/* <Timer/> */}
          <Pomodoro 
            showSettings={showSettings} 
            closeSettings={closeSettings}
          />
        </main>
        <Information/>
      </div>
    </Router>
  );
}

export default App;
