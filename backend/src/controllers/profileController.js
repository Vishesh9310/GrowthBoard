const User = require('../models/User');

const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true, runValidators: true });

        if (!updateUser) { return res.status(404).json({ message: "User not found or unauthorised" }); }

        return res.status(200).json({ message: "User updated successfully", data: updateUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while updating note" });
    }
};

module.exports = { updateUser };