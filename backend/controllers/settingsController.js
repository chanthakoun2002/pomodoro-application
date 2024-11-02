const Settings = require('../models/settings');

//get user settings
exports.getUserSettings = async (req, res) => {
    try {
      const settings = await Settings.findOne({ userId: req.user.id });
  
      if (!settings) {
        return res.status(404).json({ message: 'Settings not found.' });
      }
  
      res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

//create and or update preferred user settings
exports.updateUserSettings = async (req, res) => {
    try {
      const updatedSettings = await Settings.findOneAndUpdate(
        { userId: req.user.id },
        req.body,
        { new: true, upsert: true, runValidators: true }
      );
  
      res.status(200).json(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ message: "Server error" });
    }
  };