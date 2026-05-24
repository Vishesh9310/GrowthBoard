const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const { getTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.get('/', isLoggedIn, getTasks);
router.post('/', isLoggedIn, createTask);
router.get('/:id', isLoggedIn, getTaskById);
router.put('/:id', isLoggedIn, updateTask);
router.delete('/:id', isLoggedIn, deleteTask);

module.exports = router;