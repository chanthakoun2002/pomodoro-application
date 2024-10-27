import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ openSettings, openStatistics }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar-component">
      <div className="navbar-brand">
        <h3>Andrew's Pomodoro</h3>
      </div>
      <div className="navbar-buttons">
        <button onClick={() => alert('Statistic overlay coming soon!')}>Statistic</button>
        <button onClick={() => alert('Settings overlay coming soon!')}>Settings</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
