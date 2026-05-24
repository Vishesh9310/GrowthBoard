const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    desc: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    tags: {
        type: [String],
        default: [],
    },
    githubLink: {
        type: String,
        trim: true,
    },
    collaboration: [String],
    file: {
        type: String,//path to uploaded image
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,//every project must belong to a logged-in user
    },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);