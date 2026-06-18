const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false, message: "You already have an account. Please Login"
            });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                } else {
                    let user = await userModel.create({ email, password: hash, fullname });
                    let token = generateToken(user);
                    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                    res.status(201).json({ success: true, message: "User created Successfully", token, user: { _id: user._id, fullname: user.fullname, email: user.email } });
                }
            });
        });
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server Error"
            });
        }

        if (result) {
            // login success
            const token = generateToken(user);

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    });
};

module.exports.logoutUser = function (req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.json({ message: "Logged out" });
};