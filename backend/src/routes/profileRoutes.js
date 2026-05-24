const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { updateUser } = require('../controllers/profileController');

router.get('/', isLoggedIn, (req, res)=>{
    res.json({message: `Welcome ${req.user.fullname}`, user: req.user});
});

router.put('/', isLoggedIn, updateUser);

module.exports = router;