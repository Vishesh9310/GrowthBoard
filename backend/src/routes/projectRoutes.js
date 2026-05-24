const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const upload = require("../middleware/uploadMiddleware");
const {createProject, getUserProjects, deleteProjectById, getProjectById, updateProjectById} = require('../controllers/projectController');

router.get('/', isLoggedIn, getUserProjects);
router.get('/:id', isLoggedIn, getProjectById);
router.post('/', isLoggedIn, upload.single("file"), createProject);
router.put('/:id', isLoggedIn, upload.single("file"), updateProjectById);
router.delete('/:id', isLoggedIn, deleteProjectById);

module.exports = router;