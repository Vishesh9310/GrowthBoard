const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

// 👇 new route
router.get('/me', isLoggedIn, (req, res) => {
    res.json({ success: true, isAuthenticated: true, user: req.user });
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logoutUser);

module.exports = router;