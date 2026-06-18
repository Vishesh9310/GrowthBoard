const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
    }],
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
    }],
    achievement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "achievement",
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
    }],
    note: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "note",
    }],
    picture: String,
},{timestamps: true});

//prevent overwritemondelError
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;