const Note = require('../models/Notes');
const User = require('../models/User');

const addNote = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newNote = new Note({
      title,
      desc,
      userId: req.user._id,
    });

    const savedNote = await newNote.save();
    await User.findByIdAndUpdate(req.user._id, {$push: {note: savedNote._id}}, {new: true});

    return res.status(201).json({
      message: "Note created successfully",
      data: savedNote,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while creating note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching notes" });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }
    return res.status(200).json({ message: "Note found", data: note });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching note" });
  }
};

const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while deleting note" });
  }
};

module.exports = { addNote, getNotes, getNoteById, updateNote, deleteNote };