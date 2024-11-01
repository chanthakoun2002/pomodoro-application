import React, { useState } from 'react';
import AccountOverlay from './accountOverlay';
import SettingsOverlay from './settingsOverlay';
import StatisticsOverlay from './statisticsOverlay';
// navbar will allow user to open overlays for the user and login functionalities 

const Navbar = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = (overlay) => setIsOverlayOpen(overlay);
  const handleCloseOverlay = () => setIsOverlayOpen(false);

  return (
    <div className="navbar-component">
      <div className="navbar-brand">
        <h3>Andrew's Pomodoro</h3>
      </div>

      <div className="navbar-buttons">
        <button onClick={() => handleOpenOverlay('statistics')}>Statistics</button>
        <button onClick={() => handleOpenOverlay('settings')}>Settings</button>
        <button onClick={() => handleOpenOverlay('account')}>Account</button>

      </div>

      {isOverlayOpen === 'account' && <AccountOverlay onClose={handleCloseOverlay} />}
      {isOverlayOpen === 'settings' && <SettingsOverlay onClose={handleCloseOverlay} />}
      {isOverlayOpen === 'statistics' && <StatisticsOverlay onClose={handleCloseOverlay} />}
    </div>
  );
};

export default Navbar;
