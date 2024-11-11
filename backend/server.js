const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require("express-rate-limit");
const app = express();
dotenv.config();
const limit = rateLimit({
    windowMs:  10 * 60 * 1000,
    max: 100,
});


app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

app.use(limit);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Database connection error:', err));

const sessionRoutes = require('./routes/sessionRoute');
const settingsRoutes = require('./routes/settingRoute');
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

app.use('/pomodoro/sessions', sessionRoutes);
app.use('/pomodoro/settings', settingsRoutes);
app.use('/pomodoro/users', userRoutes);
app.use('/pomodoro/tasks', taskRoutes);

app.get('/', (req, res) => res.send('Pomodoro Backend Running'));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));