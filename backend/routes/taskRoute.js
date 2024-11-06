const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authentication = require('../middleware/authMiddleware');

router.post('/', authentication, taskController.createTask);
router.get('/', authentication, taskController.getTasks);
router.delete('/:taskId', authentication, taskController.deleteTask);

module.exports = router;