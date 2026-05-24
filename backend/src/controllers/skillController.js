const skill = require('../models/Skill');
const User = require('../models/User');

const addSkill = async (req, res) => {
    try {
        const { name, proficiency, dateOfCompletion } = req.body;
        if (!name || !proficiency || !dateOfCompletion) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newSkill = new skill({ name, proficiency, dateOfCompletion, userId: req.user._id });
        const savedSkill = await newSkill.save();
        await User.findByIdAndUpdate(req.user._id,{$push: {skill: savedSkill._id}},{new: true} );
        res.status(201).json({message: "Skill added successfully"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getSkill = async (req, res) => {
    try {
        const skillList = await skill.find({userId: req.user._id});
        res.status(200).json(skillList);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getSkillById = async (req, res) => {
    try {
        const findskill = await skill.findById({_id: req.params.id, userId: req.user._id});

        if (!findskill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        res.status(200).json(findskill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateSkillById = async (req, res) => {
    try {
        const { name, proficiency, dateOfCompletion } = req.body;
        const updateSkill = await skill.findByIdAndUpdate({_id: req.params.id, userId: req.user._id}, { name, proficiency, dateOfCompletion }, { new: true, runValidators: true });

        if (!updateSkill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        res.status(200).json(updateSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSkillById = async (req, res) => {
    try {
        const deleteSkill = await skill.findByIdAndDelete({_id: req.params.id, userId: req.user._id});

        if (!deleteSkill) {
            return res.status(404).json({ error: "Skill not found" });
        }
        res.status(200).json({
            id: req.params.id,
            message: "Skill deleted successfully"
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = { addSkill, getSkill, getSkillById, updateSkillById, deleteSkillById };