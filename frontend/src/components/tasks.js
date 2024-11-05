import React, { useState, useEffect} from 'react';
//import { getTasks, createTask, deleteTask } from '../services/repository';

const Tasks = ({tasks, onAddTask, onDeleteTask, onSelectTask, activeTaskId, currentPomodoroCount}) => {
    const [addingTasks, setAddingTasks] = useState(false);
    //const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [pomodoroCount, setPomodoroCount] = useState(1);

    // useEffect(() => {
    //     fetchTasks();
    // }, []);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask({ taskName: newTask, pomodoroCount , currentPomodoroCount });
            setNewTask('');
            setPomodoroCount(1);
            setAddingTasks(false);
        }
    };

    //get task from db if logged in if not get from last session
    // const fetchTasks = async () => {
    //     const token = sessionStorage.getItem('authToken');
    //     if (token) {
    //         try {
    //             const savedTasks = await getTasks(token);
    //             setTasks(savedTasks);
    //         } catch (error) {
    //             console.error('Error fetching tasks:', error);
    //         }
    //     } else {
    //         const sessionTasks = JSON.parse(sessionStorage.getItem('sessionTasks')) || [];
    //         setTasks(sessionTasks);
    //     }
    // };

    // const handleAddTask = async (e) => {
    //     const token = sessionStorage.getItem('authToken');
    //     e.preventDefault();
    //     if (newTask.trim()) {
    //         const task = { taskName: newTask, pomodoroCount };
    //         if (token) {
    //             try {
    //                 const savedTask = await createTask(task, token);
    //                 setTasks((prevTasks) => [...prevTasks, savedTask]);
    //             } catch (error) {
    //                 console.error('Error adding task:', error);
    //             }
    //         } else {
    //             // Save to sessionStorage if not logged in
    //             const updatedTasks = [...tasks, task];
    //             setTasks(updatedTasks);
    //             sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
    //         }
    //         setNewTask('');
    //         setPomodoroCount(1);
    //         setAddingTasks(false);
    //     }
    // };


    // const handleDeleteTask = async (index) => {
    //     const taskToBeDeleted = tasks[index];
    //     const token = sessionStorage.getItem('authToken');
    //     if (token) {
            // try {
            //     await deleteTask(taskToBeDeleted._id, token);
            //     setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
            // } catch (error) {
            //     console.error('Error deleting task:', error);
            // }
    //     } else {
    //         const updatedTasks = tasks.filter((_, i) => i !== index);
    //         setTasks(updatedTasks);
    //         sessionStorage.setItem('sessionTasks', JSON.stringify(updatedTasks));
    //     }
    // };

    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a._id === activeTaskId) return -1;  // Move active task to top
        if (b._id === activeTaskId) return 1;
        return 0;
    });

    return (
        <section className='tasks-component'>
            <header className='tasks-header'>
                <h3>Tasks</h3>
            </header>

            <div className="task-list">
                {sortedTasks.map((task) => (
                <div key={task._id} className="task-items">
                    <h1> {task._id === activeTaskId ? 'Current Task' : ''}</h1>
                    <p>{task.taskName}</p>
                    <p> {task.currentPomodoroCount || 0} / {task.pomodoroCount}</p>
                    <button onClick={() => onDeleteTask(task._id)}>Delete</button>
                    <button onClick={() => onSelectTask(task._id)}>
                        {task._id === activeTaskId ? 'Unselect' : 'Select'}
                    </button>
                </div>))}
            </div>

            {addingTasks ? (
                <form className='tasks-input-form' onSubmit={addTask}>
                    <p>Task Name</p> 
                    <input type='text' placeholder='Enter Task Name' value={newTask} onChange={(e) => setNewTask(e.target.value)} required/> 
                    <p>Estimated Pomodoro's</p> 
                    <input type='number' placeholder='1' min={1} max={100} value={pomodoroCount} onChange={(e) => setPomodoroCount(Number(e.target.value))} required/>
                    <div className='tasks-input-form-btn'>
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => setAddingTasks(false)}>Cancel</button>  
                    </div>
                </form>
            ) : (
                <div className='add-task-field' onClick={() => setAddingTasks(true)}>
                    <h1>+ Add Task +</h1>
                </div>
            )}
            
        </section>
    )

}

export default Tasks;