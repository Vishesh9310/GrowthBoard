const Project = require('../models/Project');
const User = require('../models/User');

const createProject = async (req, res) => {
    try {
        const { title, desc, tags, githubLink, collaboration } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Parse collaboration safely (as array of strings)
        let collaborationList = [];
        if (typeof collaboration === "string") {
            collaborationList = collaboration.split(",").map(c => c.trim());
        } else if (Array.isArray(collaboration)) {
            collaborationList = collaboration.map(c => c.trim());
        }

        const project = new Project({
            title,
            desc,
            tags: Array.isArray(tags)
                ? tags.map((t) => t.trim())
                : tags
                    ? tags.split(",").map((t) => t.trim())
                    : [],
            githubLink,
            collaboration: collaborationList, // ✅ store as strings only
            user: req.user?._id, // ✅ optional chaining
            file: req.file ? req.file.path.replace(/\\/g, "/") : null,
        });

        const savedProject = await project.save();
        await User.findByIdAndUpdate(req.user._id, {$push: {project: savedProject._id}}, {new: true});
        
        return res.status(201).json({ message: "Project added successfully", project });

    } catch (error) {
        console.error("Error creating project:", error.message);
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
};


const getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user._id })
            .populate("collaboration", "fullname email")
            .sort({ createdAt: -1 });

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects", error: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const findProject = await Project.findById(id);

        if (!findProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(findProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, tags, githubLink, collaboration } = req.body;
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return res.status(404).json({ error: "Project not Found" });
        };
       
        if (req.user && existingProject.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Forbidden: You do not own this project" });
        };

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (desc !== undefined) updateData.desc = desc;
        if (githubLink !== undefined) updateData.githubLink = githubLink;
        if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags.map(t => t.trim()) : [tags].map(t => t.trim());
        if (collaboration !== undefined) updateData.collaboration = Array.isArray(collaboration) ? collaboration.map(c => c.trim()): [collaboration].map(c => c.trim());
        if (req.file) {
            updateData.file = req.file.path.replace(/\\/g, "/");
        };

        const updateProject = await Project.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updateProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(updateProject);
    } catch (err) {
        console.error("Error updating project:", err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

const deleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProject = await Project.findByIdAndDelete(id);

        if (!deleteProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ id: req.params.id, message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = { createProject, getUserProjects, getProjectById, updateProjectById, deleteProjectById };