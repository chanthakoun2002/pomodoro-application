import React, { useState, useEffect} from 'react';

const SettingsOverlay = ({ settings, onTempChange, onSave, onClose, onReset}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings); // Synced local settings with prop changes
  }, [settings]);

  const handleChange = (field, value) => {// When setting changes updates are passed to the timer automatically
    const updatedSettings = { ...localSettings, [field]: value };
    setLocalSettings(updatedSettings);
    onTempChange(updatedSettings); 
  };

  const addVal = (field, max = 100) => {
    setLocalSettings(prevSettings => {
      const newValue = Math.min(prevSettings[field] + 1, max);
      handleChange(field, newValue);
      return { ...prevSettings, [field]: newValue };
    });
  };

  const removeVal = (field, min = 1) => {
    setLocalSettings(prevSettings => {
      const newValue = Math.max(prevSettings[field] - 1, min);
      handleChange(field, newValue);
      return { ...prevSettings, [field]: newValue };
    });
  };

  const handleSave = () => {
    onSave(localSettings);
  };

    return (
        <section className='overlay'> 
            <div className='overlay-container'>
                
                <button className='close-btn' onClick={onClose}>X</button>
                <h1>Settings</h1>

                <div className='timer-settings'>

                  
                  <div className='timer-settings-field'>
                    <label>Pomodoro</label>
                    <button onClick={() => removeVal('workDuration')}>-</button>
                    <span>{localSettings.workDuration}</span>
                    <button onClick={() => addVal('workDuration')}>+</button>
                  </div>
                  
                  <div className='timer-settings-field'>
                    <label>Short Break</label>
                    <button onClick={() => removeVal('shortBreakDuration')}>-</button>
                    <span>{localSettings.shortBreakDuration}</span>
                    <button onClick={() => addVal('shortBreakDuration')}>+</button>
                  </div>
                  
                  <div className='timer-settings-field'>
                    <label>Long Break</label>
                    <button onClick={() => removeVal('longBreakDuration')}>-</button>
                    <span>{localSettings.longBreakDuration}</span>
                    <button onClick={() => addVal('longBreakDuration')}>+</button>
                  </div>
                    {/* <label>Pomodoro<input type="number"  max={100} value={localSettings.workDuration} onChange={(e) => handleChange('workDuration', Number(e.target.value))}/></label>
                    <label>Short Break<input type="number"  max={100} value={localSettings.shortBreakDuration} onChange={(e) => handleChange('shortBreakDuration', Number(e.target.value))}/></label>
                    <label>Long Break<input type="number"  max={100} value={localSettings.longBreakDuration}onChange={(e) => handleChange('longBreakDuration', Number(e.target.value))}/></label> */}
                  <div className='timer-settings-field'>
                    <p>Sessions Before Long Break</p>
                    <button onClick={() => removeVal('sessionsBeforeLongBreak')}>-</button>
                    <span>{localSettings.sessionsBeforeLongBreak}</span>
                    <button onClick={() => addVal('sessionsBeforeLongBreak')}>+</button>
                  </div>
                  <label>Alert Sound<input type="checkbox" className="alert-checkbox" checked={localSettings.sound} id="inline" onChange={(e) => handleChange('sound', Number(e.target.checked))}/></label>
                </div>

                <button className='timer-save-btn' onClick={handleSave}>Save</button>
                <button className='timer-reset-btn' onClick={onReset}>Reset</button>

            </div>
            
        </section>

    );
};

export default SettingsOverlay;