const express = require('express');
const router = express.Router();
const { getNotes, addNote, getNoteById, deleteNote, updateNote } = require('../controllers/noteController');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, getNotes);
router.post('/', isLoggedIn, addNote);
router.get('/:id', isLoggedIn, getNoteById);
router.put('/:id', isLoggedIn, updateNote);
router.delete('/:id', isLoggedIn, deleteNote);

module.exports = router;