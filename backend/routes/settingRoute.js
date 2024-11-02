const express = require('express');
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const authentication = require("../middleware/authMiddleware");

router.get("/", authentication, settingsController.getUserSettings);
router.put("/", authentication, settingsController.updateUserSettings);

module.exports = router;