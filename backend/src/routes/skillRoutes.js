const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { addSkill, getSkill, getSkillById, updateSkillById, deleteSkillById } = require("../controllers/skillController");

router.post("/", isLoggedIn, addSkill);
router.get("/", isLoggedIn, getSkill );
router.get("/:id", isLoggedIn, getSkillById);
router.put("/:id", isLoggedIn, updateSkillById);
router.delete("/:id", isLoggedIn, deleteSkillById);

module.exports = router;