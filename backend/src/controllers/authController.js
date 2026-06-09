const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({sucess: false, message: "You already have an account. Please Login"});
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                } else {
                    let user = await userModel.create({ email, password: hash, fullname });
                    let token = generateToken(user);
                    res.cookie("token", token, {httpOnly: true, sameSite: "none", secure: true, maxAge: 7*24*60*60*1000});
                    req.status(201).json({sucess: true, message: "User created Successfully", token, user: {_id: user._id, fullname: user.fullname, email: user.email}});
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
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }); //7days
            return res.json({
                success: true,
                message: "Login successful",
                token
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    })
};

module.exports.logoutUser = function (req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    res.json({ message: "Logged out" });
};