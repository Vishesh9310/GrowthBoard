const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    proficiency: {
        type: Number,
        required: true,
        min: [0, "Proficiency cannot be less than 0"],
        max: [100, "Proficiency cannot be more thatn 100"]
    },
    dateOfCompletion: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);