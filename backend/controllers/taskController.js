const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try{
        const task = new Task({
            ...req.body,
            userId: req.user.id
        });

        await task.save();
        res.status(201).json(task);
    } catch (error){
        console.error('Error creating task: ', error);
        res.status(500).json({ message: 'Server error.' });
    }   
};

//gets all task that are connected to user
exports.getTasks = async (req, res) => {
    try {
       const tasks = await Task.find({ userId: req.user.id });
       res.status(200).json(tasks);
    } catch (error) {

    console.error("Error fetching tasks:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete task by id
exports.deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: 'Server error' });
    }
};