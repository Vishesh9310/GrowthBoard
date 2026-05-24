const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const upload = require("../middleware/uploadMiddleware");
const { addAchievement, getAchievement, getAchievementById, updateAchievementById, deleteAchievementById} = require("../controllers/achievementController");

const router = express.Router();

router.post("/", isLoggedIn, upload.single('file'), addAchievement);
router.get("/", isLoggedIn, getAchievement);
router.get("/:id", isLoggedIn, getAchievementById);
router.put("/:id", isLoggedIn, upload.single('file'), updateAchievementById); // allow image update
router.delete("/:id", isLoggedIn, deleteAchievementById);

module.exports = router;