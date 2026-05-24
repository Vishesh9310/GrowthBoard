const Achievement  = require('../models/Achievement');
const User = require('../models/User');

const addAchievement = async (req, res) => {
    try {
        const { skillId, date } = req.body;
        if (!skillId) return res.status(400).json({ message: "Skill ID is required" });

        const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
        if (!filePath) return res.status(400).json({ message: "File is required" });

        const newAchievement = new Achievement({ file: filePath, skillId, date, userId: req.user._id });
        const savedAchievement = await newAchievement.save();
        await User.findByIdAndUpdate(req.user._id, {$push: {achievement: savedAchievement._id}}, {new: true});
        
        res.status(201).json({ message: "Achievement added Successfully", data: newAchievement });
    } catch (err) {
        res.status(500).json({ message: "Failed to add achievement", error: err.message });
    }
};

const getAchievement = async (req, res) => {
    try {
        const achievements = await Achievement.find({userId: req.user._id}).sort({createdAt: -1});
        res.status(200).json(achievements);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch achievements", error: err.message });
    }
};

const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById({_id: req.params.id, userId: req.user._id});

        if (!achievement) {
            return res.status(404).json({ error: "Achievement not found" });
        }

        res.status(200).json(achievement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAchievementById = async (req, res) => {
  try {
    const { skillId, date } = req.body;
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const updated = await Achievement.findByIdAndUpdate(
      {_id: req.params.id, userId: req.user._id},
      { 
        ...(filePath && { file: filePath }),
        ...(skillId && { skillId }),
        ...(date && { date }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    res.status(200).json({
      message: "Achievement updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating achievement:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteAchievementById = async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete({_id: req.params.id, userId: req.user._id});

    if (!deleted) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (err) {
    console.error("Error deleting achievement:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addAchievement,
  getAchievement,
  getAchievementById,
  updateAchievementById,
  deleteAchievementById,
};