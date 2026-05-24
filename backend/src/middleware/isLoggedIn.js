const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

module.exports = async function (req, res, next) {
    try{
        //get token from the cookies
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "No token provided"});
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded?.email){
            return res.status(401).json({message: "invalid token payload"});
        }
        //find user by email
        const user = await userModel.findOne({email: decoded.email}).select("-password");
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        //attach user to request
        req.user = user;
        next();

    }catch(err){
        console.error('Auth middleware error:', err.message);
        return res.status(403).json({message: "Invalid or expieed token"});
    }
};