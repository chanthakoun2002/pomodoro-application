const Session = require('../models/session');

exports.createSession = async (req, res) => {
  try {
    // Just in case if session type is set wrong, dont log data into db
    if (!sessionType || !['Work', 'Short Break', 'Long Break'].includes(sessionType)) {
        return res.status(400).json({ message: 'Invalid session type.' });
      }

    const session = new Session({
        ...req.body,
        userId: req.user.id 
      });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


//finds and returns all sessions to the front/user
exports.getUserSessions = async (req, res) => {

    // filter session based on dates
//   const { startDate, endDate } = req.query;

//   const filter = { userId: req.user.id };
//   if (startDate && endDate) {
//     filter.startTime = { 
//       $gte: new Date(startDate), 
//       $lte: new Date(endDate) 
//     };
//   }

  try {
    //const sessions = await Session.find(filter);
    const sessions = await Session.find({ userId: req.user.id });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found.' });
    }

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};