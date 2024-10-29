import React, { useState } from 'react';
import AccountOverlay from './accountOverlay';

const Navbar = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = () => setIsOverlayOpen(true);
  const handleCloseOverlay = () => setIsOverlayOpen(false);

  return (
    <div className="navbar-component">
      <div className="navbar-brand">
        <h3>Andrew's Pomodoro</h3>
      </div>

      <div className="navbar-buttons">
        <button onClick={() => alert('Statistic overlay coming soon')}>
          Statistic
        </button>
        <button onClick={() => alert('Settings overlay coming soon')}>
          Settings
        </button>

        <button onClick={handleOpenOverlay}>Account</button>
      </div>

      {isOverlayOpen && <AccountOverlay onClose={handleCloseOverlay} />}
    </div>
  );
};

export default Navbar;
