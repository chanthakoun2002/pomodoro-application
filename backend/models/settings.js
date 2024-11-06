const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  workDuration: { 
    type: Number, 
    default: 25 
  },
  shortBreakDuration: { 
    type: Number, 
    default: 5 
  },
  longBreakDuration: { 
    type: Number, 
    default: 15 
  },
  sessionsBeforeLongBreak: { 
    type: Number, 
    default: 4 
  },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  sound: { type: Boolean, default: true }
});

module.exports = mongoose.model('Settings', settingsSchema);
