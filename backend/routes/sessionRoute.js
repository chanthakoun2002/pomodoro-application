const express = require('express');
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const authentication = require("../middleware/authMiddleware");

router.post("/", authentication,settingsController.getUserSettings);
router.get("/", authentication, settingsController.getUserSettings);

module.exports = router;