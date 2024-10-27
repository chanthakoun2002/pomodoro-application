const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionType: { type: String, enum: ['Work', 'Short Break', 'Long Break'], required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { type: String, enum: ['Completed', 'Interrupted'], default: 'Completed' }
});

module.exports = mongoose.model('Session', sessionSchema);
