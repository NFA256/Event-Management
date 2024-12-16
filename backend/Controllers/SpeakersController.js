// Import the Speaker model
const speakers = require("../Models/Speakers");

// Create a new speaker
const createSpeaker = async (req, res) => {
  try {
    const { name, image } = req.body;

    const newSpeaker = new speakers({ name, image });
    await newSpeaker.save();

    res.status(201).json({
      message: "Speaker created successfully",
      speaker: newSpeaker,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create speaker", error: error.message });
  }
};

// Get all speakers
const getAllSpeakers = async (req, res) => {
  try {
    const allSpeakers = await speakers.find();
    res.status(200).json(allSpeakers.length ? allSpeakers : { message: "No speakers found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch speakers", error: error.message });
  }
};

// Get a speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await speakers.findById(req.params.id);

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch speaker", error: error.message });
  }
};

// Update a speaker
const updateSpeaker = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name && !image) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    const updatedSpeaker = await speakers.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(name && { name }), ...(image && { image }) } },
      { new: true, runValidators: true }
    );

    if (!updatedSpeaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json({
      message: "Speaker updated successfully",
      speaker: updatedSpeaker,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update speaker", error: error.message });
  }
};

// Delete a speaker
const deleteSpeaker = async (req, res) => {
  try {
    const deletedSpeaker = await speakers.findByIdAndDelete(req.params.id);

    if (!deletedSpeaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete speaker", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
};
