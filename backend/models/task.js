const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskName: { type: String, required: true},
  currentPomodoroCount: {type: Number,  required: true, default: 1},
  pomodoroCount: {type: Number,  required: true, default: 1}
  
});

module.exports = mongoose.model('Task', taskSchema);
