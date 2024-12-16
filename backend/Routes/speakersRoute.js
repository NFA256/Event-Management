// Import dependencies
const express = require("express");
const {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
} = require("../Controllers/SpeakersController");

// Initialize router
const router = express.Router();

// Define routes

// Create a new speaker
router.post("/speakers", createSpeaker);

// Get all speakers
router.get("/speakers", getAllSpeakers);

// Get a specific speaker by ID
router.get("/speakers/:id", getSpeakerById);

// Update a speaker by ID
router.put("/speakers/:id", updateSpeaker);

// Delete a speaker by ID
router.delete("/speakers/:id", deleteSpeaker);

// Export the router
module.exports = router;
