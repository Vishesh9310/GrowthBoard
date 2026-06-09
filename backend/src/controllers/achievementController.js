const Achievement = require('../models/Achievements');
const User = require('../models/User');

const addAchievement = async (req, res) => {
  try {
    const { skillId, date } = req.body;

    if (!skillId) {
      return res.status(400).json({ message: "Skill ID is required" });
    }

    // multer-storage-cloudinary injects the Cloudinary secure URL into req.file.path
    const filePath = req.file?.path || null;

    if (!filePath) {
      return res.status(400).json({ message: "File is required and upload failed" });
    }

    const newAchievement = new Achievement({
      file: filePath, // This will store the Cloudinary URL
      skillId,
      date,
      userId: req.user._id,
    });

    const savedAchievement = await newAchievement.save();

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { achievement: savedAchievement._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Achievement added successfully",
      data: savedAchievement,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add achievement",
      error: err.message,
    });
  }
};

const getAchievement = async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch achievements", error: err.message });
  }
};

const getAchievementById = async (req, res) => {
  try {
    // Note: findById does not take a filter object, use findOne instead
    const achievement = await Achievement.findOne({ _id: req.params.id, userId: req.user._id });

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
    const filePath = req.file?.path || null;

    // Use findOneAndUpdate to scope security to the logged-in user
    const updated = await Achievement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        ...(filePath && { file: filePath }),
        ...(skillId && { skillId }),
        ...(date && { date }),
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Achievement not found or unauthorized",
      });
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
    // Note: findByIdAndDelete does not take filter objects, use findOneAndDelete
    const deleted = await Achievement.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!deleted) {
      return res.status(404).json({ error: "Achievement not found or unauthorized" });
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