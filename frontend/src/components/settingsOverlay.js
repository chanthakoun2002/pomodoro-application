import React, { useState } from 'react';

const SettingsOverlay = ({ settings, onTempChange, onSave, onClose}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {//when setting changes it updates
    const updatedSettings = { ...localSettings, [field]: value };
    setLocalSettings(updatedSettings);
    onTempChange(updatedSettings); 
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  // NOTE: shoudl set a limit to how much users are able to add/remove on timer settings
  // Sound setting does nothing yet
    return (
        <section className='overlay'> 
            <div className='overlay-container'>
                
                <button className='close-btn' onClick={onClose}>X</button>
                <h1>Settings</h1>

                <div className='timer-settings'>
                    <label>pomodoro<input type="number" min={1} max={100} value={localSettings.workDuration} onChange={(e) => handleChange('workDuration', Number(e.target.value))}/></label>
                    <label>break<input type="number" min={1} max={100} value={localSettings.shortBreakDuration} onChange={(e) => handleChange('shortBreakDuration', Number(e.target.value))}/></label>
                    <label>Long break<input type="number" min={1} max={100} value={localSettings.longBreakDuration}onChange={(e) => handleChange('longBreakDuration', Number(e.target.value))}/></label>
                </div>
                <div className='other-settings'>
                    <label>Session Before Long Break<input type="number" min={1} value={localSettings.sessionsBeforeLongBreak}onChange={(e) => handleChange('sessionsBeforeLongBreak', Number(e.target.value))}/></label>
                    <label>Alert Sound<input type="checkbox" className="alert-checkbox" checked={localSettings.sound} id="inline" onChange={(e) => handleChange('sound', Number(e.target.checked))}/></label>
                    
                </div>
                <button className='timer-save-btn' onClick={handleSave}>Save</button>

            </div>
            
        </section>

    );
};

export default SettingsOverlay;