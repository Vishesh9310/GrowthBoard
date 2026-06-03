const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
    minlength: 2,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Achievement", achievementSchema);
