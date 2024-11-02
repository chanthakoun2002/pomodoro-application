import React, { useState, useEffect } from 'react';
import Timer from './timer';
import SettingsOverlay from './settingsOverlay';
import { getSettings, saveSettings } from '../services/repository';

const DEFAULT_SETTINGS = { //when not logged into app these settings will be used
    workDuration: 25, 
    shortBreakDuration: 5, 
    longBreakDuration: 15,
    sessionBeforeLongBreak: 4,
    sound: true,
  };

const PomodoroApp = ({showSettings, closeSettings}) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //tracks login based on token and user login
    // const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('authToken');
      if(token) {
        setIsLoggedIn(true);
        fetchSettings(token);
      } else {
        console.log("User is not logged in. default settings will be used")
      }

    }, []);

    const fetchSettings = async (token) => {
      try {
        
        const savedSettings = await getSettings(token);
        setSettings(savedSettings || DEFAULT_SETTINGS); //if user setting does not exist default will be given
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    const handleSaveSettings = async (newSettings) => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          await saveSettings(newSettings, token);
          setSettings(newSettings);
          closeSettings();
        } else {
          alert("Not Logged In. cannot alter timer if not logged in");
          console.log("Cannot save settings, user not logged in.");
        }
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };
  
    return (
      <div>
        <Timer settings={settings} />
        {showSettings && (
          <SettingsOverlay settings={settings} onSave={handleSaveSettings} onClose={closeSettings}/>
        )}
      </div>
    );
};
  
export default PomodoroApp;