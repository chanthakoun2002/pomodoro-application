import React, { useState, useEffect } from 'react';
import Timer from './timer';
import SettingsOverlay from './settingsOverlay';
import Tasks from './tasks';
import { getSettings, saveSettings, getTasks, createTask, deleteTask} from '../services/repository';

const DEFAULT_SETTINGS = { //when not logged into app these settings will be used
    workDuration: 25, 
    shortBreakDuration: 5, 
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    sound: true,
  };

const PomodoroApp = ({showSettings, closeSettings}) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //tracks login based on token and user login
    const [tempSettings, setTempSettings] = useState(DEFAULT_SETTINGS);
    const [tasks, setTasks] = useState([]);
    //const [tempTasks, setTempTasks] = useState([]);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [currentPomodoroCount, setCurrentPomodoroCount] = useState(0);

    useEffect(() => {
      //if a token is saved in session storage it should mean the user is logged in
      const token = sessionStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
        loadSessionTasks(); //faster load of data if user is already in session
        fetchSettings(token);
        fetchTasks(token);
        
      } else {
        const sessionSettings = JSON.parse(sessionStorage.getItem('sessionSettings'));
        loadSessionTasks();
        if (sessionSettings) {
          console.log("settings loaded:", sessionSettings);
          setSettings(sessionSettings);
          setTempSettings(sessionSettings);
          
        } else {
          console.log("User is not logged in. default settings will be used");
        }
      }
    }, []);

    //get all task for user from backend
    const fetchSettings = async (token) => {
      try {
        const savedSettings = await getSettings(token);
        console.log("settings from db:", savedSettings)
        setSettings(savedSettings || DEFAULT_SETTINGS);
        setTempSettings(savedSettings || DEFAULT_SETTINGS);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    const resetSettings = () => {
      setSettings(DEFAULT_SETTINGS);
      setTempSettings(DEFAULT_SETTINGS);
      sessionStorage.setItem('sessionSettings', JSON.stringify(DEFAULT_SETTINGS));
      console.log('settings reset');
    }

    //for updating setting even if user is not logged in during user sessions
    const handleTempSettingsChange = (newSettings) => {
      setTempSettings(newSettings);
      setSettings(newSettings);
    };

    const handleSaveSettings = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          await saveSettings(tempSettings, token); // settings are saved to db 
          setSettings(tempSettings);
          closeSettings();
        } else {
          // setting is saved to session is user is not logged in
          sessionStorage.setItem('sessionSettings', JSON.stringify(tempSettings));
          setSettings(tempSettings);
          closeSettings();
          console.log("Session Setting Saved");
          // alert("You must be logged in to save settings");
        }
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };

    //task are saved to both session and db for faster loading of data during sessions
    const loadSessionTasks = async (token = null) => {
      if (token) {
        try {
          const savedTasks = await getTasks(token);
          setTasks(savedTasks);
          sessionStorage.setItem('sessionTasks', JSON.stringify(savedTasks));
        } catch (error) {
          console.error('Error getting tasks:', error);
        }
      } else {
        const sessionTasks = JSON.parse(sessionStorage.getItem('sessionTasks')) || [];
        setTasks(sessionTasks);
      }
    };

    const fetchTasks = async (token) => {
      //const token = sessionStorage.getItem('authToken');
      try {
        const savedTasks = await getTasks(token);
        setTasks(savedTasks);
      } catch (error) {
        console.error('Error getting tasks:', error);
      }
    };

    const handleAddTask = async (newTask) => {
      const token = sessionStorage.getItem('authToken');
      const taskWithId = { ...newTask, _id: Date.now()}; //this is for when task is saved to session to have a unique identifier
      
      if (token) {
          const savedTask = await createTask(newTask, token);
          const updatedTasks = [...tasks, savedTask];
          setTasks(updatedTasks);
          //setTasks(prevTasks) => [...prevTasks, savedTask]);
          sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
      } else {
          const updatedTasks = [...tasks, taskWithId];
          console.log(updatedTasks)
          setTasks(updatedTasks);
          sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
      }
    };

    const handleDeleteTask = async (taskId) => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
          await deleteTask(taskId, token);
          const updatedTasks = tasks.filter((task) => task._id !== taskId)
          setTasks(updatedTasks);
          sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
      } else {
         const updatedTasks = tasks.filter((task) => task._id !== taskId);
          setTasks(updatedTasks);
          sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
      }
    };

    const handlePomodoroCount = () => {
      setTasks(prevTasks => {
        //counts how many pomodoro for the task and is activated by the timer when 
        //pomodoro finishes and increments for the current active task

        return prevTasks.map(task => {
          if (task._id === activeTaskId && (task.currentPomodoroCount || 0) < task.pomodoroCount) {
            return { ...task, currentPomodoroCount:(task.currentPomodoroCount || 0) + 1,};
          }
            return task;
        });
      });
  };

    const handleTaskSelect = (taskId) => {
      setActiveTaskId((prevActiveTaskId) => (prevActiveTaskId === taskId ? null : taskId));

    };

  
    return (
      <section className='parent-pomodoro-component'>
        <Timer settings={settings}  onPomodoroCount={handlePomodoroCount}/>
        <Tasks tasks={tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onSelectTask={handleTaskSelect}
         activeTaskId={activeTaskId} currentPomodoroCount={currentPomodoroCount}
         />
        {showSettings && (
          <SettingsOverlay settings={settings} onClose={closeSettings} onReset={resetSettings} 
          onSave={handleSaveSettings} onTempChange={handleTempSettingsChange} 
          />
        )}
      </section>
    );
};
  
export default PomodoroApp;