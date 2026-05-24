const Task = require('../models/Task');
const User = require('../models/User');
// Create Task
const createTask = async (req, res) => {
  try {
    const { title, tags, deadline, status } = req.body; // use 'status' not 'tstatus'

    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required" });
    }

    const newTask = new Task({
      title,
      tags,
      deadline,
      status, // consistent field name
      userId: req.user._id, // ensure user is authenticated
    });

    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(req.user._id, {$push: {tasks: savedTask._id}}, {new: true});

    return res.status(201).json({
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (err) {
    console.error("Create Task error:", err);
    return res.status(500).json({ message: "Server error while creating task" }); // always numeric status
  }
};

// Get All Tasks for Logged-in User
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    return res.status(200).json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    return res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

// Get Task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }
    return res.status(200).json(task);
  } catch (err) {
    console.error("Get single task error:", err);
    return res.status(500).json({ message: "Server error while fetching task" });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }
    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    console.error("Update Task error:", err);
    return res.status(500).json({ message: "Server error while updating task" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id, 
      userId: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    return res.status(500).json({ message: "Server error while deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};