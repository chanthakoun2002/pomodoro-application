const express = require('express');
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const authentication = require("../middleware/authMiddleware");

router.post("/", authentication, sessionController.createSession);
router.get("/", authentication, sessionController.getUserSessions);

module.exports = router;