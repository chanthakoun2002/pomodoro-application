import React, { useState, useEffect} from 'react';
import {getSettings} from '../services/repository'

const DEFAULT_SETTINGS = {
    pomodoroDuration: 1500,  // 25 mins
    shortBreakDuration: 300,  // 5 min
    longBreakDuration: 900,   // 15 min
    sessionBeforeLongBreak: 4,
    sound: true
  };


const SettingsOverlay = ({ onClose }) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS)

    const handleChange = ({}) => {}

    const handleSave = ({}) => {}



    return (
        <div className='overlay'> 
            <div className='overlay-container'>
                
                <button className='close-btn' onClick={onClose}>X</button>
                <h1>Settings</h1>

                <div className='timer-settings'>
                    <h2>timer</h2>
                    <label>pomodoro<input type="number"value={settings.pomodoroDuration} /></label>
                    <label>break<input type="number" value={settings.shortBreakDuration}/></label>
                    <label>longbreak<input type="number" value={settings.sessionBeforeLongBreak}/></label>
                </div>
                <div className='other-settings'>
                    <label>Session Before Long Break<input type="number" value={settings.longBreakDuration}/></label>
                    <label>Alert Sound on/off<input type="checkbox" class="onoffswitch-checkbox" checked={settings.sound} id="inline"/></label>
                     
                </div>
                <button>Save</button>

            </div>
            
        </div>

    );
};

export default SettingsOverlay;