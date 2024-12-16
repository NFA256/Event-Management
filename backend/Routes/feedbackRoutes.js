const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../Controllers/FeedbackController"); // Adjust the path as needed

// Create a new feedback
router.post("/feedbacks", createFeedback);

// Get all feedbacks
router.get("/feedbacks", getAllFeedbacks);

// Get a specific feedback by ID
router.get("/feedbacks/:id", getFeedbackById);

// Update a feedback by ID
router.put("/feedbacks/:id", updateFeedback);

// Delete a feedback by ID
router.delete("/feedbacks/:id", deleteFeedback);

module.exports = router;
