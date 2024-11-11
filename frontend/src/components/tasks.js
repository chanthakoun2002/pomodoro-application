import React, { useState} from 'react';

const Tasks = ({tasks, onAddTask, onDeleteTask, onSelectTask, activeTaskId, currentPomodoroCount}) => {
    const [addingTasks, setAddingTasks] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [pomodoroCount, setPomodoroCount] = useState(1);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask({ taskName: newTask, pomodoroCount , currentPomodoroCount });
            setNewTask('');
            setPomodoroCount(1);
            setAddingTasks(false);
        }
    };

    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a._id === activeTaskId) return -1;  // Move active task to top
        if (b._id === activeTaskId) return 1;
        return 0;
    });

    const handleTaskForm = () => {
        setAddingTasks(true);
        setPomodoroCount(1);
    }

    const removeVal = () => {
        setPomodoroCount(prevCount => Math.max(prevCount - 1, 1));
    }
    const addVal = () => {
        
        setPomodoroCount(prevCount => Math.min(prevCount + 1, 100));
    }

    return (
        <section className='tasks-component'>
            <header className='tasks-header'>
                <h3>Tasks</h3>
            </header>

            <div className="task-list">
                {sortedTasks.map((task) => (
                <div key={task._id} className="task-items">
                    <h1> {task._id === activeTaskId ? 'Current Task' : ''}</h1>
                    <p>Task: {task.taskName}</p>
                    <p>Pomodoros: {task.currentPomodoroCount || 0} / {task.pomodoroCount}</p>
                    
                    <div className='task-item-buttons'>
                        <button className='task-delete-btn' onClick={() => onDeleteTask(task._id)}>Delete</button>
                        <button className='task-select-btn' onClick={() => onSelectTask(task._id)}>
                            {task._id === activeTaskId ? 'Unselect' : 'Select'}
                        </button>
                    </div>
                    
                </div>))}
            </div>

            {addingTasks ? (
                <form className='tasks-input-form' onSubmit={addTask}>
                    <p>Task Name</p> 
                    <input type='text' placeholder='Enter Task Name' value={newTask} onChange={(e) => setNewTask(e.target.value)} required/> 
                    <p>Estimated Pomodoro's</p> 
                    <div className='tasks-input-form-pomodoro-btn'>
                        <button type="button" onClick={removeVal}>-</button>
                        <span>{pomodoroCount}</span>
                        <button type="button" onClick={addVal}>+</button> 
                    </div>
                    
                    {/* <input type='number' placeholder='1' min={1} max={100} value={pomodoroCount} onChange={(e) => setPomodoroCount(Number(e.target.value))} required/> */}
                    <div className='tasks-input-form-btn'>
                        <button className='form-add-btn'type="submit">Add</button>
                        <button className='form-cancel-btn' type="button" onClick={() => setAddingTasks(false)}>Cancel</button>  
                    </div>
                </form>
            ) : (
                <div className='add-task-field' onClick={handleTaskForm}>
                    <h1>+ Add Task +</h1>
                </div>
            )}
        </section>
    )
}

export default Tasks;