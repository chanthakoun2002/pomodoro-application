import React, { useState } from 'react';

const SettingsOverlay = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {
    setLocalSettings((prev) => ({ ...prev, [field]: value })); //when setting changes it updates
  };

  const handleSave = () => {
    onSave(localSettings);
  };

    return (
        <div className='overlay'> 
            <div className='overlay-container'>
                
                <button className='close-btn' onClick={onClose}>X</button>
                <h1>Settings</h1>

                <div className='timer-settings'>
                    <h2>timer</h2>
                    <label>pomodoro<input type="number"value={localSettings.workDuration} onChange={(e) => handleChange('workDuration', Number(e.target.value))}/></label>
                    <label>break<input type="number" value={localSettings.shortBreakDuration} onChange={(e) => handleChange('shortBreakDuration', Number(e.target.value))}/></label>
                    <label>Long break<input type="number" value={localSettings.longBreakDuration}onChange={(e) => handleChange('longBreakDuration', Number(e.target.value))}/></label>
                </div>
                <div className='other-settings'>
                    <label>Session Before Long Break<input type="number" value={localSettings.sessionBeforeLongBreak}onChange={(e) => handleChange('sessionBeforeLongBreak', Number(e.target.value))}/></label>
                    <label>Alert Sound<input type="checkbox" className="alert-checkbox" checked={localSettings.sound} id="inline" onChange={(e) => handleChange('sound', Number(e.target.checked))}/></label>
                     
                </div>
                <button onClick={handleSave}>Save</button>

            </div>
            
        </div>

    );
};

export default SettingsOverlay;